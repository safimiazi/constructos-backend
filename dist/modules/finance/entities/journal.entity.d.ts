import { TenantBaseEntity } from '../../../database/base.entity';
export declare class ChartOfAccount extends TenantBaseEntity {
    code: string;
    name: string;
    type: string;
    parentId: string | null;
    isActive: boolean;
}
export declare class JournalEntry extends TenantBaseEntity {
    entryDate: Date;
    reference: string | null;
    description: string | null;
    isPosted: boolean;
    lines: {
        accountId: string;
        debit: number;
        credit: number;
        projectId?: string;
    }[];
}
export declare class InvoicePayment extends TenantBaseEntity {
    invoiceId: string;
    amount: number;
    paidAt: Date;
    method: string | null;
    reference: string | null;
}
