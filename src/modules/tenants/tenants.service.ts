import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { Branch } from './entities/branch.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant) private repo: Repository<Tenant>,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) {}

  async getCompany(tenantId: string) {
    const t = await this.repo.findOne({ where: { id: tenantId } });
    if (!t) throw new NotFoundException('Tenant not found');
    return t;
  }

  async updateCompany(tenantId: string, dto: Partial<Tenant>) {
    await this.repo.update({ id: tenantId }, dto);
    return this.getCompany(tenantId);
  }

  // Branches
  findBranches(tenantId: string) {
    return this.branchRepo.find({ where: { tenantId }, order: { isHQ: 'DESC', name: 'ASC' } });
  }

  createBranch(tenantId: string, userId: string, dto: Partial<Branch>) {
    return this.branchRepo.save(this.branchRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateBranch(tenantId: string, id: string, dto: Partial<Branch>) {
    await this.branchRepo.update({ id, tenantId }, dto);
    return this.branchRepo.findOne({ where: { id, tenantId } });
  }

  async removeBranch(tenantId: string, id: string) {
    await this.branchRepo.softDelete({ id, tenantId });
  }
}
