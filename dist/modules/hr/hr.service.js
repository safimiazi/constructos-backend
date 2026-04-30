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
const leave_type_entity_1 = require("./entities/leave-type.entity");
const payslip_entity_1 = require("./entities/payslip.entity");
let HrService = class HrService {
    empRepo;
    attRepo;
    leaveRepo;
    runRepo;
    itemRepo;
    deptRepo;
    jobRepo;
    applicantRepo;
    leaveTypeRepo;
    payslipRepo;
    constructor(empRepo, attRepo, leaveRepo, runRepo, itemRepo, deptRepo, jobRepo, applicantRepo, leaveTypeRepo, payslipRepo) {
        this.empRepo = empRepo;
        this.attRepo = attRepo;
        this.leaveRepo = leaveRepo;
        this.runRepo = runRepo;
        this.itemRepo = itemRepo;
        this.deptRepo = deptRepo;
        this.jobRepo = jobRepo;
        this.applicantRepo = applicantRepo;
        this.leaveTypeRepo = leaveTypeRepo;
        this.payslipRepo = payslipRepo;
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
        const data = { ...dto, tenantId, createdBy: userId };
        if (dto.date && dto.checkIn && !dto.checkIn.includes('T')) {
            data.checkIn = new Date(`${dto.date}T${dto.checkIn}:00`);
        }
        if (dto.date && dto.checkOut && !dto.checkOut.includes('T')) {
            data.checkOut = new Date(`${dto.date}T${dto.checkOut}:00`);
        }
        if (data.checkIn && data.checkOut) {
            const diffMs = new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime();
            if (diffMs > 0) {
                data.workingHours = Math.round((diffMs / 3600000) * 100) / 100;
                data.overtimeHours = Math.max(0, Math.round((data.workingHours - 8) * 100) / 100);
            }
        }
        return this.attRepo.save(this.attRepo.create(data));
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
        const leave = await this.leaveRepo.findOne({ where: { id, tenantId } });
        if (!leave)
            throw new common_1.NotFoundException('Leave request not found');
        if (leave.status !== leave_entity_1.LeaveStatus.PENDING)
            throw new common_1.BadRequestException(`Cannot approve leave with status: ${leave.status}`);
        await this.leaveRepo.update({ id, tenantId }, { status: leave_entity_1.LeaveStatus.APPROVED, approvedBy: approverId, approvedAt: new Date() });
        return this.leaveRepo.findOne({ where: { id, tenantId } });
    }
    async rejectLeave(tenantId, id, reason) {
        const leave = await this.leaveRepo.findOne({ where: { id, tenantId } });
        if (!leave)
            throw new common_1.NotFoundException('Leave request not found');
        if (leave.status !== leave_entity_1.LeaveStatus.PENDING)
            throw new common_1.BadRequestException(`Cannot reject leave with status: ${leave.status}`);
        if (!reason?.trim())
            throw new common_1.BadRequestException('Rejection reason is required');
        await this.leaveRepo.update({ id, tenantId }, { status: leave_entity_1.LeaveStatus.REJECTED, rejectionReason: reason });
        return this.leaveRepo.findOne({ where: { id, tenantId } });
    }
    findPayrollRuns(tenantId) {
        return this.runRepo.find({ where: { tenantId }, order: { payPeriod: 'DESC' } });
    }
    async createPayrollRun(tenantId, userId, payPeriod) {
        const existing = await this.runRepo.findOne({ where: { tenantId, payPeriod } });
        if (existing)
            throw new common_1.BadRequestException(`Payroll run for ${payPeriod} already exists (status: ${existing.status})`);
        const employees = await this.empRepo.find({ where: { tenantId, status: 'active' } });
        const run = await this.runRepo.save(this.runRepo.create({ tenantId, payPeriod, createdBy: userId, totalEmployees: employees.length }));
        const items = employees.map(e => {
            const basic = Number(e.basicSalary);
            const netPay = basic;
            return this.itemRepo.create({
                tenantId, runId: run.id, employeeId: e.id,
                basicSalary: basic, overtimePay: 0,
                bonuses: [], deductions: [], totalBonuses: 0, totalDeductions: 0,
                netPay, createdBy: userId,
            });
        });
        await this.itemRepo.save(items);
        const totalNetPay = items.reduce((s, i) => s + Number(i.netPay), 0);
        await this.runRepo.update(run.id, { totalNetPay });
        return this.runRepo.findOne({ where: { id: run.id } });
    }
    async updatePayrollItem(tenantId, itemId, dto) {
        const item = await this.itemRepo.findOne({ where: { id: itemId, tenantId } });
        if (!item)
            throw new common_1.NotFoundException('Payroll item not found');
        const overtimePay = dto.overtimePay ?? Number(item.overtimePay);
        const bonuses = dto.bonuses ?? item.bonuses;
        const deductions = dto.deductions ?? item.deductions;
        const totalBonuses = bonuses.reduce((s, b) => s + Number(b.amount), 0);
        const totalDeductions = deductions.reduce((s, d) => s + Number(d.amount), 0);
        const netPay = Number(item.basicSalary) + overtimePay + totalBonuses - totalDeductions;
        await this.itemRepo.update({ id: itemId, tenantId }, { overtimePay, bonuses, deductions, totalBonuses, totalDeductions, netPay });
        const runTotal = await this.itemRepo.createQueryBuilder('i')
            .select('SUM(i.net_pay)', 'total')
            .where('i.tenant_id = :tenantId AND i.run_id = :runId', { tenantId, runId: item.runId })
            .getRawOne();
        await this.runRepo.update({ id: item.runId }, { totalNetPay: Number(runTotal?.total ?? 0) });
        return this.itemRepo.findOne({ where: { id: itemId, tenantId } });
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
    async clockIn(tenantId, employeeId, userId, location) {
        const today = new Date().toISOString().split('T')[0];
        const existing = await this.attRepo.findOne({ where: { tenantId, employeeId, date: today } });
        if (existing) {
            await this.attRepo.update({ id: existing.id }, { checkIn: new Date(), location, status: attendance_entity_1.AttendanceStatus.PRESENT });
            return this.attRepo.findOne({ where: { id: existing.id } });
        }
        return this.attRepo.save(this.attRepo.create({
            tenantId, employeeId, date: today,
            checkIn: new Date(), status: attendance_entity_1.AttendanceStatus.PRESENT,
            location, createdBy: userId,
        }));
    }
    async clockOut(tenantId, employeeId, location) {
        const today = new Date().toISOString().split('T')[0];
        const record = await this.attRepo.findOne({ where: { tenantId, employeeId, date: today } });
        if (!record)
            throw new common_1.NotFoundException('No clock-in record found for today. Please clock in first.');
        if (!record.checkIn)
            throw new common_1.BadRequestException('Clock-in time not recorded. Cannot calculate working hours.');
        const checkOut = new Date();
        const checkIn = new Date(record.checkIn);
        const diffMs = checkOut.getTime() - checkIn.getTime();
        if (diffMs < 0)
            throw new common_1.BadRequestException('Clock-out time cannot be before clock-in time.');
        const workingHours = Math.round((diffMs / 3600000) * 100) / 100;
        const overtimeHours = Math.max(0, Math.round((workingHours - 8) * 100) / 100);
        await this.attRepo.update({ id: record.id }, { checkOut, workingHours, overtimeHours, location });
        return this.attRepo.findOne({ where: { id: record.id } });
    }
    findLeaveTypes(tenantId) {
        return this.leaveTypeRepo.find({ where: { tenantId, isActive: true }, order: { name: 'ASC' } });
    }
    createLeaveType(tenantId, userId, dto) {
        return this.leaveTypeRepo.save(this.leaveTypeRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateLeaveType(tenantId, id, dto) {
        await this.leaveTypeRepo.update({ id, tenantId }, dto);
        return this.leaveTypeRepo.findOne({ where: { id, tenantId } });
    }
    async generatePayslips(tenantId, runId) {
        const items = await this.itemRepo.find({ where: { tenantId, runId } });
        const run = await this.runRepo.findOne({ where: { id: runId, tenantId } });
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        await this.payslipRepo
            .createQueryBuilder()
            .delete()
            .where('tenant_id = :tenantId AND payroll_item_id IN (:...itemIds)', {
            tenantId,
            itemIds: items.map(i => i.id),
        })
            .execute();
        if (items.length === 0)
            return [];
        const payslips = items.map(item => this.payslipRepo.create({
            tenantId,
            payrollItemId: item.id,
            employeeId: item.employeeId,
            payPeriod: run.payPeriod,
            basicSalary: item.basicSalary,
            overtimePay: item.overtimePay,
            bonuses: item.bonuses,
            deductions: item.deductions,
            netPay: item.netPay,
            createdBy: run.createdBy ?? null,
        }));
        return this.payslipRepo.save(payslips);
    }
    getPayslips(tenantId, employeeId) {
        return this.payslipRepo.find({ where: { tenantId, employeeId }, order: { payPeriod: 'DESC' } });
    }
    async getHRAnalytics(tenantId) {
        const [totalEmployees, activeEmployees, onLeave, terminated] = await Promise.all([
            this.empRepo.count({ where: { tenantId } }),
            this.empRepo.count({ where: { tenantId, status: 'active' } }),
            this.empRepo.count({ where: { tenantId, status: 'on_leave' } }),
            this.empRepo.count({ where: { tenantId, status: 'terminated' } }),
        ]);
        const payrollCost = await this.itemRepo.createQueryBuilder('i')
            .select('SUM(i.net_pay)', 'total').where('i.tenant_id = :tenantId', { tenantId }).getRawOne();
        const deptBreakdown = await this.empRepo.createQueryBuilder('e')
            .leftJoin('departments', 'd', 'd.id = e.department_id')
            .select('e.department_id', 'departmentId')
            .addSelect('COALESCE(d.name, \'Unassigned\')', 'departmentName')
            .addSelect('COUNT(*)', 'count')
            .where('e.tenant_id = :tenantId AND e.deleted_at IS NULL', { tenantId })
            .groupBy('e.department_id').addGroupBy('d.name')
            .getRawMany();
        const overtimeHours = await this.attRepo.createQueryBuilder('a')
            .select('SUM(a.overtime_hours)', 'total').where('a.tenant_id = :tenantId', { tenantId }).getRawOne();
        const activeAndTerminated = activeEmployees + terminated;
        const turnoverRate = activeAndTerminated > 0 ? Math.round((terminated / activeAndTerminated) * 100) : 0;
        return { totalEmployees, activeEmployees, onLeave, terminated, turnoverRate, totalPayrollCost: Number(payrollCost?.total ?? 0), deptBreakdown, totalOvertimeHours: Number(overtimeHours?.total ?? 0) };
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
    __param(8, (0, typeorm_1.InjectRepository)(leave_type_entity_1.LeaveType)),
    __param(9, (0, typeorm_1.InjectRepository)(payslip_entity_1.Payslip)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HrService);
//# sourceMappingURL=hr.service.js.map