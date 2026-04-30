import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum DependencyType {
    FS = "FS",
    SS = "SS",
    FF = "FF",
    SF = "SF"
}
export declare class TaskDependency extends TenantBaseEntity {
    taskId: string;
    dependsOnTaskId: string;
    type: DependencyType;
    lagDays: number;
}
