import { TenantBaseEntity } from '../../../database/base.entity';
export declare class BankAccount extends TenantBaseEntity {
    name: string;
    accountNo: string;
    bankName: string;
    currency: string;
    balance: number;
    isActive: boolean;
}
