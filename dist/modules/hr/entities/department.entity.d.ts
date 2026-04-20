import { TenantBaseEntity } from '../../../database/base.entity';
export declare class Department extends TenantBaseEntity {
    name: string;
    parentId: string | null;
    headUserId: string | null;
    description: string | null;
}
