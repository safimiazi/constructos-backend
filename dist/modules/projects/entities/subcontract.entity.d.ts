import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum SubcontractStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    COMPLETED = "completed",
    TERMINATED = "terminated"
}
export declare class Subcontract extends TenantBaseEntity {
    projectId: string;
    vendorId: string | null;
    subcontractorName: string | null;
    scope: string | null;
    contractValue: number;
    startDate: Date | null;
    endDate: Date | null;
    status: SubcontractStatus;
    completionPct: number;
    notes: string | null;
}
