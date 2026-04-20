import { BaseEntity } from '../../../database/base.entity';
export declare enum TenantStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
    TRIAL = "trial",
    CANCELLED = "cancelled"
}
export declare class Tenant extends BaseEntity {
    slug: string;
    companyName: string;
    logoUrl: string | null;
    planId: string | null;
    status: TenantStatus;
    trialEndsAt: Date | null;
    timezone: string;
    currency: string;
    taxNumber: string | null;
    address: string | null;
    phone: string | null;
}
