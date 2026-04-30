import { TenantBaseEntity } from '../../../database/base.entity';
export declare class Payslip extends TenantBaseEntity {
    payrollItemId: string;
    employeeId: string;
    payPeriod: string;
    pdfUrl: string | null;
    sentAt: Date | null;
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
    netPay: number;
}
