import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Tenant } from '../../modules/tenants/entities/tenant.entity';
export declare class TenantGuard implements CanActivate {
    private tenantRepo;
    private dataSource;
    constructor(tenantRepo: Repository<Tenant>, dataSource: DataSource);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
