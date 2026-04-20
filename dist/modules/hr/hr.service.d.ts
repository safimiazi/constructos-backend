import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Attendance } from './entities/attendance.entity';
import { Leave } from './entities/leave.entity';
import { PayrollRun, PayrollItem } from './entities/payroll.entity';
import { Department } from './entities/department.entity';
import { JobPosting, Applicant, ApplicantStage } from './entities/job-posting.entity';
export declare class HrService {
    private empRepo;
    private attRepo;
    private leaveRepo;
    private runRepo;
    private itemRepo;
    private deptRepo;
    private jobRepo;
    private applicantRepo;
    constructor(empRepo: Repository<Employee>, attRepo: Repository<Attendance>, leaveRepo: Repository<Leave>, runRepo: Repository<PayrollRun>, itemRepo: Repository<PayrollItem>, deptRepo: Repository<Department>, jobRepo: Repository<JobPosting>, applicantRepo: Repository<Applicant>);
    findEmployees(tenantId: string, q: {
        search?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Employee[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findEmployee(tenantId: string, id: string): Promise<Employee>;
    createEmployee(tenantId: string, userId: string, dto: Partial<Employee>): Promise<Employee>;
    updateEmployee(tenantId: string, id: string, dto: Partial<Employee>): Promise<Employee>;
    removeEmployee(tenantId: string, id: string): Promise<void>;
    findDepartments(tenantId: string): Promise<Department[]>;
    createDepartment(tenantId: string, userId: string, dto: Partial<Department>): Promise<Department>;
    updateDepartment(tenantId: string, id: string, dto: Partial<Department>): Promise<Department | null>;
    removeDepartment(tenantId: string, id: string): Promise<void>;
    findAttendance(tenantId: string, q: {
        employeeId?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<Attendance[]>;
    createAttendance(tenantId: string, userId: string, dto: Partial<Attendance>): Promise<Attendance>;
    updateAttendance(tenantId: string, id: string, dto: Partial<Attendance>): Promise<Attendance | null>;
    getAttendanceSummary(tenantId: string, month: string): Promise<any[]>;
    findLeaves(tenantId: string, q: {
        employeeId?: string;
        status?: string;
    }): Promise<Leave[]>;
    createLeave(tenantId: string, userId: string, dto: Partial<Leave>): Promise<Leave>;
    approveLeave(tenantId: string, id: string, approverId: string): Promise<Leave | null>;
    rejectLeave(tenantId: string, id: string, reason: string): Promise<Leave | null>;
    findPayrollRuns(tenantId: string): Promise<PayrollRun[]>;
    createPayrollRun(tenantId: string, userId: string, payPeriod: string): Promise<PayrollRun | null>;
    getPayrollItems(tenantId: string, runId: string): Promise<PayrollItem[]>;
    approvePayrollRun(tenantId: string, runId: string, approverId: string): Promise<PayrollRun | null>;
    findJobs(tenantId: string): Promise<JobPosting[]>;
    createJob(tenantId: string, userId: string, dto: Partial<JobPosting>): Promise<JobPosting>;
    updateJob(tenantId: string, id: string, dto: Partial<JobPosting>): Promise<JobPosting | null>;
    findApplicants(tenantId: string, jobId: string): Promise<Applicant[]>;
    createApplicant(tenantId: string, userId: string, dto: Partial<Applicant>): Promise<Applicant>;
    moveApplicantStage(tenantId: string, id: string, stage: ApplicantStage): Promise<Applicant | null>;
}
