import { TenantBaseEntity } from '../../../database/base.entity';
export declare class CustomRole extends TenantBaseEntity {
    name: string;
    description: string | null;
    permissions: Record<string, boolean>;
    isActive: boolean;
}
