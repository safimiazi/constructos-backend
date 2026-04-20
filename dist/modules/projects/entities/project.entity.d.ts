import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum ProjectStatus {
    PLANNING = "planning",
    ACTIVE = "active",
    ON_HOLD = "on_hold",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum ProjectType {
    RESIDENTIAL = "residential",
    COMMERCIAL = "commercial",
    INDUSTRIAL = "industrial",
    INFRASTRUCTURE = "infrastructure",
    RENOVATION = "renovation"
}
export declare class Project extends TenantBaseEntity {
    name: string;
    type: ProjectType;
    description: string | null;
    clientId: string | null;
    location: string | null;
    budgetAmount: number;
    startDate: Date | null;
    endDate: Date | null;
    status: ProjectStatus;
    projectManagerId: string | null;
    completionPercentage: number;
    contractNumber: string | null;
}
