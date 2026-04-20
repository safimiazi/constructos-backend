import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
    BLOCKED = "blocked"
}
export declare enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare class Task extends TenantBaseEntity {
    projectId: string;
    parentTaskId: string | null;
    title: string;
    description: string | null;
    assignedTo: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    startDate: Date | null;
    dueDate: Date | null;
    progressPct: number;
    budgetAmount: number;
    wbsCode: string | null;
}
