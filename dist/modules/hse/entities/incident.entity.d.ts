import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum IncidentType {
    ACCIDENT = "accident",
    NEAR_MISS = "near_miss",
    PROPERTY_DAMAGE = "property_damage"
}
export declare enum IncidentSeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare enum IncidentStatus {
    OPEN = "open",
    INVESTIGATING = "investigating",
    CLOSED = "closed"
}
export declare class Incident extends TenantBaseEntity {
    projectId: string;
    incidentDate: Date;
    type: IncidentType;
    severity: IncidentSeverity;
    description: string;
    injuredPerson: string | null;
    rootCause: string | null;
    correctiveActions: string[];
    photos: string[];
    status: IncidentStatus;
}
