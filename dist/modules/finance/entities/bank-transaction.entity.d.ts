import { TenantBaseEntity } from '../../../database/base.entity';
export declare class BankTransaction extends TenantBaseEntity {
    bankAccountId: string;
    date: Date;
    description: string;
    amount: number;
    type: string;
    reconciled: boolean;
    reference: string | null;
    matchedInvoiceId: string | null;
}
