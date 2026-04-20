import { BaseEntity } from '../../database/base.entity';
export declare class AuditLog extends BaseEntity {
    userId: string | null;
    tenantId: string | null;
    action: string;
    entityType: string | null;
    entityId: string | null;
    changes: Record<string, unknown> | null;
    ipAddress: string | null;
}
