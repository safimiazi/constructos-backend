import { TenantBaseEntity } from '../../../database/base.entity';
export declare class DailyLog extends TenantBaseEntity {
    projectId: string;
    taskId: string | null;
    date: Date;
    workDone: string;
    progressPct: number;
    blockers: string | null;
    photos: string[];
    weather: string | null;
    workersCount: number;
}
