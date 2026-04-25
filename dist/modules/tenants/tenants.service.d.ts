import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
export declare class TenantsService {
    private repo;
    constructor(repo: Repository<Tenant>);
    getCompany(tenantId: string): Promise<Tenant>;
    updateCompany(tenantId: string, dto: Partial<Tenant>): Promise<Tenant>;
}
