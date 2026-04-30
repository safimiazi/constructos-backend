import { TenantBaseEntity } from '../../../database/base.entity';
export declare class Branch extends TenantBaseEntity {
    name: string;
    city: string | null;
    phone: string | null;
    isHQ: boolean;
    isActive: boolean;
}
