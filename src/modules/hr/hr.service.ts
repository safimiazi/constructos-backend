import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Attendance, AttendanceStatus } from './entities/attendance.entity';
import { Leave, LeaveStatus } from './entities/leave.entity';
import { PayrollRun, PayrollItem, PayrollStatus } from './entities/payroll.entity';
import { Department } from './entities/department.entity';
import { JobPosting, Applicant, ApplicantStage } from './entities/job-posting.entity';
import { LeaveType } from './entities/leave-type.entity';

@Injectable()
export class HrService {
  constructor(
    @InjectRepository(Employee) private empRepo: Repository<Employee>,
    @InjectRepository(Attendance) private attRepo: Repository<Attendance>,
    @InjectRepository(Leave) private leaveRepo: Repository<Leave>,
    @InjectRepository(PayrollRun) private runRepo: Repository<PayrollRun>,
    @InjectRepository(PayrollItem) private itemRepo: Repository<PayrollItem>,
    @InjectRepository(Department) private deptRepo: Repository<Department>,
    @InjectRepository(JobPosting) private jobRepo: Repository<JobPosting>,
    @InjectRepository(Applicant) private applicantRepo: Repository<Applicant>,
    @InjectRepository(LeaveType) private leaveTypeRepo: Repository<LeaveType>,
  ) {}

  // ── Employees ──────────────────────────────────────────────────────────────

  findEmployees(tenantId: string, q: { search?: string; status?: string; page?: number; limit?: number }) {
    const { search, status, page = 1, limit = 20 } = q;
    const qb = this.empRepo.createQueryBuilder('e')
      .where('e.tenant_id = :tenantId AND e.deleted_at IS NULL', { tenantId })
      .orderBy('e.first_name', 'ASC').skip((page - 1) * limit).take(limit);
    if (search) qb.andWhere('(e.first_name ILIKE :s OR e.last_name ILIKE :s OR e.email ILIKE :s OR e.employee_code ILIKE :s)', { s: `%${search}%` });
    if (status) qb.andWhere('e.status = :status', { status });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findEmployee(tenantId: string, id: string) {
    const e = await this.empRepo.findOne({ where: { id, tenantId } });
    if (!e) throw new NotFoundException('Employee not found');
    return e;
  }

  createEmployee(tenantId: string, userId: string, dto: Partial<Employee>) {
    return this.empRepo.save(this.empRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateEmployee(tenantId: string, id: string, dto: Partial<Employee>) {
    await this.findEmployee(tenantId, id);
    await this.empRepo.update({ id, tenantId }, dto);
    return this.findEmployee(tenantId, id);
  }

  async removeEmployee(tenantId: string, id: string) {
    await this.findEmployee(tenantId, id);
    await this.empRepo.softDelete({ id, tenantId });
  }

  // ── Departments ────────────────────────────────────────────────────────────

  findDepartments(tenantId: string) {
    return this.deptRepo.find({ where: { tenantId }, order: { name: 'ASC' } });
  }

  createDepartment(tenantId: string, userId: string, dto: Partial<Department>) {
    return this.deptRepo.save(this.deptRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateDepartment(tenantId: string, id: string, dto: Partial<Department>) {
    await this.deptRepo.update({ id, tenantId }, dto);
    return this.deptRepo.findOne({ where: { id, tenantId } });
  }

  async removeDepartment(tenantId: string, id: string) {
    await this.deptRepo.softDelete({ id, tenantId });
  }

  // ── Attendance ─────────────────────────────────────────────────────────────

  findAttendance(tenantId: string, q: { employeeId?: string; startDate?: string; endDate?: string }) {
    const qb = this.attRepo.createQueryBuilder('a')
      .where('a.tenant_id = :tenantId', { tenantId }).orderBy('a.date', 'DESC');
    if (q.employeeId) qb.andWhere('a.employee_id = :eid', { eid: q.employeeId });
    if (q.startDate) qb.andWhere('a.date >= :sd', { sd: q.startDate });
    if (q.endDate) qb.andWhere('a.date <= :ed', { ed: q.endDate });
    return qb.getMany();
  }

  createAttendance(tenantId: string, userId: string, dto: Partial<Attendance>) {
    return this.attRepo.save(this.attRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateAttendance(tenantId: string, id: string, dto: Partial<Attendance>) {
    await this.attRepo.update({ id, tenantId }, dto);
    return this.attRepo.findOne({ where: { id, tenantId } });
  }

  getAttendanceSummary(tenantId: string, month: string) {
    return this.attRepo.createQueryBuilder('a')
      .select('a.status', 'status').addSelect('COUNT(*)', 'count')
      .where('a.tenant_id = :tenantId AND TO_CHAR(a.date, \'YYYY-MM\') = :month', { tenantId, month })
      .groupBy('a.status').getRawMany();
  }

  // ── Leave ──────────────────────────────────────────────────────────────────

  findLeaves(tenantId: string, q: { employeeId?: string; status?: string }) {
    const qb = this.leaveRepo.createQueryBuilder('l')
      .where('l.tenant_id = :tenantId', { tenantId }).orderBy('l.created_at', 'DESC');
    if (q.employeeId) qb.andWhere('l.employee_id = :eid', { eid: q.employeeId });
    if (q.status) qb.andWhere('l.status = :status', { status: q.status });
    return qb.getMany();
  }

  createLeave(tenantId: string, userId: string, dto: Partial<Leave>) {
    return this.leaveRepo.save(this.leaveRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async approveLeave(tenantId: string, id: string, approverId: string) {
    const leave = await this.leaveRepo.findOne({ where: { id, tenantId } });
    if (!leave) throw new Error('Leave request not found');
    if (leave.status !== LeaveStatus.PENDING) throw new Error(`Cannot approve leave with status: ${leave.status}`);
    await this.leaveRepo.update({ id, tenantId }, { status: LeaveStatus.APPROVED, approvedBy: approverId, approvedAt: new Date() });
    return this.leaveRepo.findOne({ where: { id, tenantId } });
  }

  async rejectLeave(tenantId: string, id: string, reason: string) {
    const leave = await this.leaveRepo.findOne({ where: { id, tenantId } });
    if (!leave) throw new Error('Leave request not found');
    if (leave.status !== LeaveStatus.PENDING) throw new Error(`Cannot reject leave with status: ${leave.status}`);
    if (!reason?.trim()) throw new Error('Rejection reason is required');
    await this.leaveRepo.update({ id, tenantId }, { status: LeaveStatus.REJECTED, rejectionReason: reason });
    return this.leaveRepo.findOne({ where: { id, tenantId } });
  }

  // ── Payroll ────────────────────────────────────────────────────────────────

  findPayrollRuns(tenantId: string) {
    return this.runRepo.find({ where: { tenantId }, order: { payPeriod: 'DESC' } });
  }

  async createPayrollRun(tenantId: string, userId: string, payPeriod: string) {
    const employees = await this.empRepo.find({ where: { tenantId } });
    const run = await this.runRepo.save(this.runRepo.create({ tenantId, payPeriod, createdBy: userId, totalEmployees: employees.length }));
    const items = employees.map(e => {
      const basic = Number(e.basicSalary);
      const netPay = basic; // bonuses/deductions added later via update
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

  async updatePayrollItem(tenantId: string, itemId: string, dto: {
    overtimePay?: number;
    bonuses?: { label: string; amount: number }[];
    deductions?: { label: string; amount: number }[];
  }) {
    const item = await this.itemRepo.findOne({ where: { id: itemId, tenantId } });
    if (!item) throw new Error('Payroll item not found');
    const overtimePay = dto.overtimePay ?? Number(item.overtimePay);
    const bonuses = dto.bonuses ?? item.bonuses;
    const deductions = dto.deductions ?? item.deductions;
    const totalBonuses = bonuses.reduce((s, b) => s + Number(b.amount), 0);
    const totalDeductions = deductions.reduce((s, d) => s + Number(d.amount), 0);
    const netPay = Number(item.basicSalary) + overtimePay + totalBonuses - totalDeductions;
    await this.itemRepo.update({ id: itemId, tenantId }, { overtimePay, bonuses, deductions, totalBonuses, totalDeductions, netPay });
    // Recalculate run total
    const allItems = await this.itemRepo.find({ where: { tenantId, runId: item.runId } });
    const totalNetPay = allItems.reduce((s, i) => s + (i.id === itemId ? netPay : Number(i.netPay)), 0);
    await this.runRepo.update({ id: item.runId }, { totalNetPay });
    return this.itemRepo.findOne({ where: { id: itemId, tenantId } });
  }

  getPayrollItems(tenantId: string, runId: string) {
    return this.itemRepo.find({ where: { tenantId, runId } });
  }

  async approvePayrollRun(tenantId: string, runId: string, approverId: string) {
    await this.runRepo.update({ id: runId, tenantId }, { status: PayrollStatus.APPROVED, approvedBy: approverId });
    return this.runRepo.findOne({ where: { id: runId } });
  }

  // ── Recruitment ────────────────────────────────────────────────────────────

  findJobs(tenantId: string) {
    return this.jobRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' } });
  }

  createJob(tenantId: string, userId: string, dto: Partial<JobPosting>) {
    return this.jobRepo.save(this.jobRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateJob(tenantId: string, id: string, dto: Partial<JobPosting>) {
    await this.jobRepo.update({ id, tenantId }, dto);
    return this.jobRepo.findOne({ where: { id, tenantId } });
  }

  findApplicants(tenantId: string, jobId: string) {
    return this.applicantRepo.find({ where: { tenantId, jobId }, order: { createdAt: 'DESC' } });
  }

  createApplicant(tenantId: string, userId: string, dto: Partial<Applicant>) {
    return this.applicantRepo.save(this.applicantRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async moveApplicantStage(tenantId: string, id: string, stage: ApplicantStage) {
    await this.applicantRepo.update({ id, tenantId }, { stage });
    return this.applicantRepo.findOne({ where: { id, tenantId } });
  }

  // ── Clock In / Clock Out ───────────────────────────────────────────────────

  async clockIn(tenantId: string, employeeId: string, userId: string, location?: string) {
    const today = new Date().toISOString().split('T')[0];
    const existing = await this.attRepo.findOne({ where: { tenantId, employeeId, date: today as any } });
    if (existing) {
      // Update check-in time
      await this.attRepo.update({ id: existing.id }, { checkIn: new Date(), location, status: AttendanceStatus.PRESENT });
      return this.attRepo.findOne({ where: { id: existing.id } });
    }
    return this.attRepo.save(this.attRepo.create({
      tenantId, employeeId, date: today as any,
      checkIn: new Date(), status: AttendanceStatus.PRESENT,
      location, createdBy: userId,
    }));
  }

  async clockOut(tenantId: string, employeeId: string, location?: string) {
    const today = new Date().toISOString().split('T')[0];
    const record = await this.attRepo.findOne({ where: { tenantId, employeeId, date: today as any } });
    if (!record) throw new NotFoundException('No clock-in record found for today. Please clock in first.');
    if (!record.checkIn) throw new Error('Clock-in time not recorded. Cannot calculate working hours.');
    const checkOut = new Date();
    const checkIn = new Date(record.checkIn);
    const diffMs = checkOut.getTime() - checkIn.getTime();
    if (diffMs < 0) throw new Error('Clock-out time cannot be before clock-in time.');
    const workingHours = Math.round((diffMs / 3600000) * 100) / 100;
    const overtimeHours = Math.max(0, Math.round((workingHours - 8) * 100) / 100);
    await this.attRepo.update({ id: record.id }, { checkOut, workingHours, overtimeHours, location });
    return this.attRepo.findOne({ where: { id: record.id } });
  }

  // ── Leave Types ────────────────────────────────────────────────────────────

  findLeaveTypes(tenantId: string) {
    return this.leaveTypeRepo.find({ where: { tenantId, isActive: true }, order: { name: 'ASC' } });
  }

  createLeaveType(tenantId: string, userId: string, dto: Partial<LeaveType>) {
    return this.leaveTypeRepo.save(this.leaveTypeRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateLeaveType(tenantId: string, id: string, dto: Partial<LeaveType>) {
    await this.leaveTypeRepo.update({ id, tenantId }, dto);
    return this.leaveTypeRepo.findOne({ where: { id, tenantId } });
  }
}
