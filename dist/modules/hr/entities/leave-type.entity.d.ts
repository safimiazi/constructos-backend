import { TenantBaseEntity } from '../../../database/base.entity';
export declare class LeaveType extends TenantBaseEntity {
    name: string;
    annualEntitlement: number;
    isPaid: boolean;
    carryForward: boolean;
    isActive: boolean;
}
