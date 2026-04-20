import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum PayrollStatus {
    DRAFT = "draft",
    APPROVED = "approved",
    PAID = "paid"
}
export declare class PayrollRun extends TenantBaseEntity {
    payPeriod: string;
    totalEmployees: number;
    totalNetPay: number;
    status: PayrollStatus;
    payDate: Date | null;
    approvedBy: string | null;
}
export declare class PayrollItem extends TenantBaseEntity {
    runId: string;
    employeeId: string;
    basicSalary: number;
    overtimePay: number;
    bonuses: {
        label: string;
        amount: number;
    }[];
    deductions: {
        label: string;
        amount: number;
    }[];
    totalBonuses: number;
    totalDeductions: number;
    netPay: number;
}
