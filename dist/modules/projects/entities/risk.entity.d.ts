import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum RiskStatus {
    OPEN = "open",
    MITIGATED = "mitigated",
    CLOSED = "closed"
}
export declare enum RiskLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare class Risk extends TenantBaseEntity {
    projectId: string;
    title: string;
    description: string | null;
    likelihood: RiskLevel;
    impact: RiskLevel;
    status: RiskStatus;
    mitigationPlan: string | null;
    ownerId: string | null;
}
