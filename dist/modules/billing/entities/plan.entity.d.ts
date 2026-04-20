import { BaseEntity } from '../../../database/base.entity';
import { PlanTier } from '../../../common/interfaces/jwt-payload.interface';
export declare class Plan extends BaseEntity {
    name: string;
    tier: PlanTier;
    priceMonthly: number;
    priceAnnual: number;
    maxUsers: number | null;
    maxProjects: number | null;
    storageGb: number;
    features: Record<string, boolean>;
    isActive: boolean;
}
