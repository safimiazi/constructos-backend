import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { Branch } from './entities/branch.entity';
export declare class TenantsService {
    private repo;
    private branchRepo;
    constructor(repo: Repository<Tenant>, branchRepo: Repository<Branch>);
    getCompany(tenantId: string): Promise<Tenant>;
    updateCompany(tenantId: string, dto: Partial<Tenant>): Promise<Tenant>;
    findBranches(tenantId: string): Promise<Branch[]>;
    createBranch(tenantId: string, userId: string, dto: Partial<Branch>): Promise<Branch>;
    updateBranch(tenantId: string, id: string, dto: Partial<Branch>): Promise<Branch | null>;
    removeBranch(tenantId: string, id: string): Promise<void>;
}
