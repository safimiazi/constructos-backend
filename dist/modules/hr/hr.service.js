"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const attendance_entity_1 = require("./entities/attendance.entity");
const leave_entity_1 = require("./entities/leave.entity");
const payroll_entity_1 = require("./entities/payroll.entity");
const department_entity_1 = require("./entities/department.entity");
const job_posting_entity_1 = require("./entities/job-posting.entity");
let HrService = class HrService {
    empRepo;
    attRepo;
    leaveRepo;
    runRepo;
    itemRepo;
    deptRepo;
    jobRepo;
    applicantRepo;
    constructor(empRepo, attRepo, leaveRepo, runRepo, itemRepo, deptRepo, jobRepo, applicantRepo) {
        this.empRepo = empRepo;
        this.attRepo = attRepo;
        this.leaveRepo = leaveRepo;
        this.runRepo = runRepo;
        this.itemRepo = itemRepo;
        this.deptRepo = deptRepo;
        this.jobRepo = jobRepo;
        this.applicantRepo = applicantRepo;
    }
    findEmployees(tenantId, q) {
        const { search, status, page = 1, limit = 20 } = q;
        const qb = this.empRepo.createQueryBuilder('e')
            .where('e.tenant_id = :tenantId AND e.deleted_at IS NULL', { tenantId })
            .orderBy('e.first_name', 'ASC').skip((page - 1) * limit).take(limit);
        if (search)
            qb.andWhere('(e.first_name ILIKE :s OR e.last_name ILIKE :s OR e.email ILIKE :s OR e.employee_code ILIKE :s)', { s: `%${search}%` });
        if (status)
            qb.andWhere('e.status = :status', { status });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findEmployee(tenantId, id) {
        const e = await this.empRepo.findOne({ where: { id, tenantId } });
        if (!e)
            throw new common_1.NotFoundException('Employee not found');
        return e;
    }
    createEmployee(tenantId, userId, dto) {
        return this.empRepo.save(this.empRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateEmployee(tenantId, id, dto) {
        await this.findEmployee(tenantId, id);
        await this.empRepo.update({ id, tenantId }, dto);
        return this.findEmployee(tenantId, id);
    }
    async removeEmployee(tenantId, id) {
        await this.findEmployee(tenantId, id);
        await this.empRepo.softDelete({ id, tenantId });
    }
    findDepartments(tenantId) {
        return this.deptRepo.find({ where: { tenantId }, order: { name: 'ASC' } });
    }
    createDepartment(tenantId, userId, dto) {
        return this.deptRepo.save(this.deptRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateDepartment(tenantId, id, dto) {
        await this.deptRepo.update({ id, tenantId }, dto);
        return this.deptRepo.findOne({ where: { id, tenantId } });
    }
    async removeDepartment(tenantId, id) {
        await this.deptRepo.softDelete({ id, tenantId });
    }
    findAttendance(tenantId, q) {
        const qb = this.attRepo.createQueryBuilder('a')
            .where('a.tenant_id = :tenantId', { tenantId }).orderBy('a.date', 'DESC');
        if (q.employeeId)
            qb.andWhere('a.employee_id = :eid', { eid: q.employeeId });
        if (q.startDate)
            qb.andWhere('a.date >= :sd', { sd: q.startDate });
        if (q.endDate)
            qb.andWhere('a.date <= :ed', { ed: q.endDate });
        return qb.getMany();
    }
    createAttendance(tenantId, userId, dto) {
        return this.attRepo.save(this.attRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateAttendance(tenantId, id, dto) {
        await this.attRepo.update({ id, tenantId }, dto);
        return this.attRepo.findOne({ where: { id, tenantId } });
    }
    getAttendanceSummary(tenantId, month) {
        return this.attRepo.createQueryBuilder('a')
            .select('a.status', 'status').addSelect('COUNT(*)', 'count')
            .where('a.tenant_id = :tenantId AND TO_CHAR(a.date, \'YYYY-MM\') = :month', { tenantId, month })
            .groupBy('a.status').getRawMany();
    }
    findLeaves(tenantId, q) {
        const qb = this.leaveRepo.createQueryBuilder('l')
            .where('l.tenant_id = :tenantId', { tenantId }).orderBy('l.created_at', 'DESC');
        if (q.employeeId)
            qb.andWhere('l.employee_id = :eid', { eid: q.employeeId });
        if (q.status)
            qb.andWhere('l.status = :status', { status: q.status });
        return qb.getMany();
    }
    createLeave(tenantId, userId, dto) {
        return this.leaveRepo.save(this.leaveRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async approveLeave(tenantId, id, approverId) {
        await this.leaveRepo.update({ id, tenantId }, { status: leave_entity_1.LeaveStatus.APPROVED, approvedBy: approverId, approvedAt: new Date() });
        return this.leaveRepo.findOne({ where: { id, tenantId } });
    }
    async rejectLeave(tenantId, id, reason) {
        await this.leaveRepo.update({ id, tenantId }, { status: leave_entity_1.LeaveStatus.REJECTED, rejectionReason: reason });
        return this.leaveRepo.findOne({ where: { id, tenantId } });
    }
    findPayrollRuns(tenantId) {
        return this.runRepo.find({ where: { tenantId }, order: { payPeriod: 'DESC' } });
    }
    async createPayrollRun(tenantId, userId, payPeriod) {
        const employees = await this.empRepo.find({ where: { tenantId } });
        const run = await this.runRepo.save(this.runRepo.create({ tenantId, payPeriod, createdBy: userId, totalEmployees: employees.length }));
        const items = employees.map(e => this.itemRepo.create({
            tenantId, runId: run.id, employeeId: e.id,
            basicSalary: e.basicSalary, overtimePay: 0,
            bonuses: [], deductions: [], totalBonuses: 0, totalDeductions: 0,
            netPay: e.basicSalary, createdBy: userId,
        }));
        await this.itemRepo.save(items);
        const totalNetPay = items.reduce((s, i) => s + Number(i.netPay), 0);
        await this.runRepo.update(run.id, { totalNetPay });
        return this.runRepo.findOne({ where: { id: run.id } });
    }
    getPayrollItems(tenantId, runId) {
        return this.itemRepo.find({ where: { tenantId, runId } });
    }
    async approvePayrollRun(tenantId, runId, approverId) {
        await this.runRepo.update({ id: runId, tenantId }, { status: payroll_entity_1.PayrollStatus.APPROVED, approvedBy: approverId });
        return this.runRepo.findOne({ where: { id: runId } });
    }
    findJobs(tenantId) {
        return this.jobRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' } });
    }
    createJob(tenantId, userId, dto) {
        return this.jobRepo.save(this.jobRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateJob(tenantId, id, dto) {
        await this.jobRepo.update({ id, tenantId }, dto);
        return this.jobRepo.findOne({ where: { id, tenantId } });
    }
    findApplicants(tenantId, jobId) {
        return this.applicantRepo.find({ where: { tenantId, jobId }, order: { createdAt: 'DESC' } });
    }
    createApplicant(tenantId, userId, dto) {
        return this.applicantRepo.save(this.applicantRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async moveApplicantStage(tenantId, id, stage) {
        await this.applicantRepo.update({ id, tenantId }, { stage });
        return this.applicantRepo.findOne({ where: { id, tenantId } });
    }
};
exports.HrService = HrService;
exports.HrService = HrService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(2, (0, typeorm_1.InjectRepository)(leave_entity_1.Leave)),
    __param(3, (0, typeorm_1.InjectRepository)(payroll_entity_1.PayrollRun)),
    __param(4, (0, typeorm_1.InjectRepository)(payroll_entity_1.PayrollItem)),
    __param(5, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(6, (0, typeorm_1.InjectRepository)(job_posting_entity_1.JobPosting)),
    __param(7, (0, typeorm_1.InjectRepository)(job_posting_entity_1.Applicant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HrService);
//# sourceMappingURL=hr.service.js.map