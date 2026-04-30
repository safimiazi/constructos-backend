import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum DefectStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
export declare enum DefectSeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare class Defect extends TenantBaseEntity {
    projectId: string;
    title: string;
    description: string | null;
    location: string | null;
    severity: DefectSeverity;
    status: DefectStatus;
    assignedTo: string | null;
    dueDate: Date | null;
    resolvedAt: Date | null;
}
