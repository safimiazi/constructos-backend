import { BaseEntity } from '../../../database/base.entity';
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    PAST_DUE = "past_due",
    CANCELLED = "cancelled",
    TRIALING = "trialing"
}
export declare enum BillingCycle {
    MONTHLY = "monthly",
    ANNUAL = "annual"
}
export declare class Subscription extends BaseEntity {
    tenantId: string;
    planId: string;
    status: SubscriptionStatus;
    billingCycle: BillingCycle;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    paymentGatewayId: string | null;
    cancelledAt: Date | null;
}
