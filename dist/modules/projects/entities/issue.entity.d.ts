import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum IssuePriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare enum IssueStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
export declare class Issue extends TenantBaseEntity {
    projectId: string;
    title: string;
    description: string | null;
    priority: IssuePriority;
    status: IssueStatus;
    assignedTo: string | null;
    photos: string[];
    resolvedAt: Date | null;
}
