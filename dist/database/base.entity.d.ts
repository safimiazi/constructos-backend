export declare abstract class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export declare abstract class TenantBaseEntity extends BaseEntity {
    tenantId: string;
    createdBy: string | null;
}
