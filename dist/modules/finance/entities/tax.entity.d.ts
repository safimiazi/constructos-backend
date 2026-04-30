import { TenantBaseEntity } from '../../../database/base.entity';
export declare class TaxRate extends TenantBaseEntity {
    name: string;
    rate: number;
    type: string;
    isActive: boolean;
    description: string | null;
}
export declare class ExpenseClaim extends TenantBaseEntity {
    employeeId: string;
    title: string;
    amount: number;
    date: Date;
    category: string;
    projectId: string | null;
    receiptUrl: string | null;
    status: string;
    approvedBy: string | null;
    notes: string | null;
}
