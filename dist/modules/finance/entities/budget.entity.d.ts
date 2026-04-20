import { TenantBaseEntity } from '../../../database/base.entity';
export declare class Budget extends TenantBaseEntity {
    projectId: string;
    phase: string | null;
    costCode: string | null;
    description: string;
    budgetAmount: number;
    actualAmount: number;
}
