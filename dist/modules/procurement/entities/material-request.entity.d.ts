import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum MRStatus {
    PENDING = "pending",
    APPROVED = "approved",
    ORDERED = "ordered",
    REJECTED = "rejected"
}
export declare class MaterialRequest extends TenantBaseEntity {
    projectId: string;
    taskId: string | null;
    status: MRStatus;
    items: {
        name: string;
        qty: number;
        unit: string;
        estimatedCost: number;
    }[];
    notes: string | null;
    neededBy: Date | null;
    approvedBy: string | null;
}
