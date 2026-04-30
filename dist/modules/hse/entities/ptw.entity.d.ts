import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum PTWStatus {
    PENDING = "pending",
    ACTIVE = "active",
    CLOSED = "closed",
    CANCELLED = "cancelled"
}
export declare enum PTWType {
    HOT_WORK = "hot_work",
    EXCAVATION = "excavation",
    CONFINED_SPACE = "confined_space",
    ELECTRICAL = "electrical",
    WORKING_AT_HEIGHT = "working_at_height"
}
export declare class PermitToWork extends TenantBaseEntity {
    projectId: string;
    permitType: PTWType;
    issuedTo: string;
    validFrom: Date;
    validUntil: Date;
    conditions: string[];
    status: PTWStatus;
    issuedBy: string | null;
    notes: string | null;
}
export declare class SafetyChecklist extends TenantBaseEntity {
    projectId: string;
    title: string;
    items: {
        question: string;
        answer: boolean | null;
        notes?: string;
    }[];
    conductedBy: string | null;
    date: Date;
    score: number | null;
    status: string;
}
