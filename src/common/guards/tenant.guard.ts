import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Tenant, TenantStatus } from '../../modules/tenants/entities/tenant.entity';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
    private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // SuperAdmin bypasses tenant guard
    if (user?.isSuperAdmin) return true;

    const tenantId = user?.tenantId;
    if (!tenantId) throw new UnauthorizedException('No tenant context');

    const tenant = await this.tenantRepo.findOne({ where: { id: tenantId } });
    if (!tenant) throw new UnauthorizedException('Tenant not found');
    if (tenant.status === TenantStatus.SUSPENDED) {
      throw new ForbiddenException('Tenant account is suspended');
    }
    if (tenant.status === TenantStatus.CANCELLED) {
      throw new ForbiddenException('Tenant account is cancelled');
    }

    request.tenant = tenant;

    // Set RLS session variable for PostgreSQL
    await this.dataSource.query(
      `SET LOCAL app.tenant_id = '${tenantId}'`,
    );

    return true;
  }
}
