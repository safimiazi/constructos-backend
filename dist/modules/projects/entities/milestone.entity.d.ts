import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum MilestoneStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    OVERDUE = "overdue"
}
export declare class Milestone extends TenantBaseEntity {
    projectId: string;
    name: string;
    dueDate: Date;
    status: MilestoneStatus;
    responsibleId: string | null;
    description: string | null;
}
