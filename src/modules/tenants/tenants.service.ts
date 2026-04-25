import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(@InjectRepository(Tenant) private repo: Repository<Tenant>) {}

  async getCompany(tenantId: string) {
    const t = await this.repo.findOne({ where: { id: tenantId } });
    if (!t) throw new NotFoundException('Tenant not found');
    return t;
  }

  async updateCompany(tenantId: string, dto: Partial<Tenant>) {
    await this.repo.update({ id: tenantId }, dto);
    return this.getCompany(tenantId);
  }
}
