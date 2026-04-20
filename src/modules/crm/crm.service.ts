import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { Lead, LeadStage } from './entities/lead.entity';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Lead) private leadRepo: Repository<Lead>,
  ) {}

  // Clients
  findClients(tenantId: string, q: { search?: string; page?: number; limit?: number }) {
    const { search, page = 1, limit = 20 } = q;
    const qb = this.clientRepo.createQueryBuilder('c')
      .where('c.tenant_id = :tenantId AND c.deleted_at IS NULL', { tenantId })
      .orderBy('c.name', 'ASC').skip((page - 1) * limit).take(limit);
    if (search) qb.andWhere('c.name ILIKE :s OR c.email ILIKE :s', { s: `%${search}%` });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findClient(tenantId: string, id: string) {
    const c = await this.clientRepo.findOne({ where: { id, tenantId } });
    if (!c) throw new NotFoundException('Client not found');
    return c;
  }

  createClient(tenantId: string, userId: string, dto: Partial<Client>) {
    return this.clientRepo.save(this.clientRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateClient(tenantId: string, id: string, dto: Partial<Client>) {
    await this.findClient(tenantId, id);
    await this.clientRepo.update({ id, tenantId }, dto);
    return this.findClient(tenantId, id);
  }

  async removeClient(tenantId: string, id: string) {
    await this.findClient(tenantId, id);
    await this.clientRepo.softDelete({ id, tenantId });
  }

  // Leads
  findLeads(tenantId: string, q: { stage?: string; page?: number; limit?: number }) {
    const { stage, page = 1, limit = 20 } = q;
    const qb = this.leadRepo.createQueryBuilder('l')
      .where('l.tenant_id = :tenantId AND l.deleted_at IS NULL', { tenantId })
      .orderBy('l.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (stage) qb.andWhere('l.stage = :stage', { stage });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findLead(tenantId: string, id: string) {
    const l = await this.leadRepo.findOne({ where: { id, tenantId } });
    if (!l) throw new NotFoundException('Lead not found');
    return l;
  }

  createLead(tenantId: string, userId: string, dto: Partial<Lead>) {
    return this.leadRepo.save(this.leadRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateLead(tenantId: string, id: string, dto: Partial<Lead>) {
    await this.findLead(tenantId, id);
    await this.leadRepo.update({ id, tenantId }, dto);
    return this.findLead(tenantId, id);
  }

  async moveLeadStage(tenantId: string, id: string, stage: LeadStage) {
    await this.leadRepo.update({ id, tenantId }, { stage });
    return this.findLead(tenantId, id);
  }

  async removeLead(tenantId: string, id: string) {
    await this.findLead(tenantId, id);
    await this.leadRepo.softDelete({ id, tenantId });
  }

  getPipelineSummary(tenantId: string) {
    return this.leadRepo.createQueryBuilder('l')
      .select('l.stage', 'stage')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(l.expected_value)', 'totalValue')
      .where('l.tenant_id = :tenantId AND l.deleted_at IS NULL', { tenantId })
      .groupBy('l.stage')
      .getRawMany();
  }
}
