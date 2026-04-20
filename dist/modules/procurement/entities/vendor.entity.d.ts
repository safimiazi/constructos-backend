import { TenantBaseEntity } from '../../../database/base.entity';
export declare class Vendor extends TenantBaseEntity {
    name: string;
    phone: string | null;
    email: string | null;
    address: string | null;
    contactPerson: string | null;
    taxNumber: string | null;
    isActive: boolean;
    notes: string | null;
}
