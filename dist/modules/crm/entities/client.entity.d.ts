import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum ClientType {
    INDIVIDUAL = "individual",
    COMPANY = "company"
}
export declare class Client extends TenantBaseEntity {
    name: string;
    type: ClientType;
    contactPerson: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    source: string | null;
    isActive: boolean;
}
