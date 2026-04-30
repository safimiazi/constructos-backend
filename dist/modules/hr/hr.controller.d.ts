import { HrService } from './hr.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { ApplicantStage } from './entities/job-posting.entity';
export declare class HrController {
    private readonly svc;
    constructor(svc: HrService);
    findEmployees(u: JwtPayload, q: any): Promise<{
        data: import("./entities/employee.entity").Employee[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createEmployee(u: JwtPayload, dto: any): Promise<import("./entities/employee.entity").Employee>;
    findEmployee(u: JwtPayload, id: string): Promise<import("./entities/employee.entity").Employee>;
    updateEmployee(u: JwtPayload, id: string, dto: any): Promise<import("./entities/employee.entity").Employee>;
    removeEmployee(u: JwtPayload, id: string): Promise<void>;
    findDepts(u: JwtPayload): Promise<import("./entities/department.entity").Department[]>;
    createDept(u: JwtPayload, dto: any): Promise<import("./entities/department.entity").Department>;
    updateDept(u: JwtPayload, id: string, dto: any): Promise<import("./entities/department.entity").Department | null>;
    removeDept(u: JwtPayload, id: string): Promise<void>;
    findAttendance(u: JwtPayload, q: any): Promise<import("./entities/attendance.entity").Attendance[]>;
    getAttSummary(u: JwtPayload, month: string): Promise<any[]>;
    createAttendance(u: JwtPayload, dto: any): Promise<import("./entities/attendance.entity").Attendance>;
    clockIn(u: JwtPayload, dto: {
        employeeId: string;
        location?: string;
    }): Promise<import("./entities/attendance.entity").Attendance | null>;
    clockOut(u: JwtPayload, dto: {
        employeeId: string;
        location?: string;
    }): Promise<import("./entities/attendance.entity").Attendance | null>;
    updateAttendance(u: JwtPayload, id: string, dto: any): Promise<import("./entities/attendance.entity").Attendance | null>;
    findLeaveTypes(u: JwtPayload): Promise<import("./entities/leave-type.entity").LeaveType[]>;
    createLeaveType(u: JwtPayload, dto: any): Promise<import("./entities/leave-type.entity").LeaveType>;
    updateLeaveType(u: JwtPayload, id: string, dto: any): Promise<import("./entities/leave-type.entity").LeaveType | null>;
    findLeaves(u: JwtPayload, q: any): Promise<import("./entities/leave.entity").Leave[]>;
    createLeave(u: JwtPayload, dto: any): Promise<import("./entities/leave.entity").Leave>;
    approveLeave(u: JwtPayload, id: string): Promise<import("./entities/leave.entity").Leave | null>;
    rejectLeave(u: JwtPayload, id: string, dto: {
        reason: string;
    }): Promise<import("./entities/leave.entity").Leave | null>;
    findPayrollRuns(u: JwtPayload): Promise<import("./entities/payroll.entity").PayrollRun[]>;
    createPayrollRun(u: JwtPayload, dto: {
        payPeriod: string;
    }): Promise<import("./entities/payroll.entity").PayrollRun | null>;
    getPayrollItems(u: JwtPayload, id: string): Promise<import("./entities/payroll.entity").PayrollItem[]>;
    updatePayrollItem(u: JwtPayload, id: string, dto: any): Promise<import("./entities/payroll.entity").PayrollItem | null>;
    approvePayrollRun(u: JwtPayload, id: string): Promise<import("./entities/payroll.entity").PayrollRun | null>;
    findJobs(u: JwtPayload): Promise<import("./entities/job-posting.entity").JobPosting[]>;
    createJob(u: JwtPayload, dto: any): Promise<import("./entities/job-posting.entity").JobPosting>;
    updateJob(u: JwtPayload, id: string, dto: any): Promise<import("./entities/job-posting.entity").JobPosting | null>;
    findApplicants(u: JwtPayload, id: string): Promise<import("./entities/job-posting.entity").Applicant[]>;
    createApplicant(u: JwtPayload, id: string, dto: any): Promise<import("./entities/job-posting.entity").Applicant>;
    moveStage(u: JwtPayload, id: string, dto: {
        stage: ApplicantStage;
    }): Promise<import("./entities/job-posting.entity").Applicant | null>;
    generatePayslips(u: JwtPayload, id: string): Promise<import("./entities/payslip.entity").Payslip[]>;
    getPayslips(u: JwtPayload, id: string): Promise<import("./entities/payslip.entity").Payslip[]>;
    getAnalytics(u: JwtPayload): Promise<{
        totalEmployees: number;
        activeEmployees: number;
        onLeave: number;
        terminated: number;
        turnoverRate: number;
        totalPayrollCost: number;
        deptBreakdown: any[];
        totalOvertimeHours: number;
    }>;
}
