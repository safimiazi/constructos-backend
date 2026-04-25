import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { Lead, LeadStage } from './entities/lead.entity';
import { Proposal, ProposalStatus, Contract } from './entities/proposal.entity';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Lead) private leadRepo: Repository<Lead>,
    @InjectRepository(Proposal) private proposalRepo: Repository<Proposal>,
    @InjectRepository(Contract) private contractRepo: Repository<Contract>,
  ) {}

  // Clients
  findClients(tenantId: string, q: { search?: string; page?: number; limit?: number }) {
    const { search, page = 1, limit = 20 } = q;
    const qb = this.clientRepo.createQueryBuilder('c').where('c.tenant_id = :tenantId AND c.deleted_at IS NULL', { tenantId }).orderBy('c.name', 'ASC').skip((page - 1) * limit).take(limit);
    if (search) qb.andWhere('c.name ILIKE :s OR c.email ILIKE :s', { s: `%${search}%` });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findClient(tenantId: string, id: string) {
    const c = await this.clientRepo.findOne({ where: { id, tenantId } });
    if (!c) throw new NotFoundException('Client not found');
    return c;
  }

  createClient(tenantId: string, userId: string, dto: Partial<Client>) { return this.clientRepo.save(this.clientRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async updateClient(tenantId: string, id: string, dto: Partial<Client>) { await this.findClient(tenantId, id); await this.clientRepo.update({ id, tenantId }, dto); return this.findClient(tenantId, id); }
  async removeClient(tenantId: string, id: string) { await this.findClient(tenantId, id); await this.clientRepo.softDelete({ id, tenantId }); }

  // Leads
  findLeads(tenantId: string, q: { stage?: string; page?: number; limit?: number }) {
    const { stage, page = 1, limit = 20 } = q;
    const qb = this.leadRepo.createQueryBuilder('l').where('l.tenant_id = :tenantId AND l.deleted_at IS NULL', { tenantId }).orderBy('l.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (stage) qb.andWhere('l.stage = :stage', { stage });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findLead(tenantId: string, id: string) {
    const l = await this.leadRepo.findOne({ where: { id, tenantId } });
    if (!l) throw new NotFoundException('Lead not found');
    return l;
  }

  createLead(tenantId: string, userId: string, dto: Partial<Lead>) { return this.leadRepo.save(this.leadRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async updateLead(tenantId: string, id: string, dto: Partial<Lead>) { await this.findLead(tenantId, id); await this.leadRepo.update({ id, tenantId }, dto); return this.findLead(tenantId, id); }
  async moveLeadStage(tenantId: string, id: string, stage: LeadStage) { await this.leadRepo.update({ id, tenantId }, { stage }); return this.findLead(tenantId, id); }
  async removeLead(tenantId: string, id: string) { await this.findLead(tenantId, id); await this.leadRepo.softDelete({ id, tenantId }); }

  getPipelineSummary(tenantId: string) {
    return this.leadRepo.createQueryBuilder('l').select('l.stage', 'stage').addSelect('COUNT(*)', 'count').addSelect('SUM(l.expected_value)', 'totalValue')
      .where('l.tenant_id = :tenantId AND l.deleted_at IS NULL', { tenantId }).groupBy('l.stage').getRawMany();
  }

  getAnalytics(tenantId: string) {
    return Promise.all([
      this.leadRepo.count({ where: { tenantId } }),
      this.leadRepo.count({ where: { tenantId, stage: LeadStage.WON } }),
      this.proposalRepo.count({ where: { tenantId } }),
      this.contractRepo.count({ where: { tenantId } }),
    ]).then(([totalLeads, wonLeads, totalProposals, totalContracts]) => ({
      totalLeads, wonLeads, conversionRate: totalLeads ? Math.round((wonLeads / totalLeads) * 100) : 0, totalProposals, totalContracts,
    }));
  }

  // Proposals
  findProposals(tenantId: string) { return this.proposalRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' } }); }
  createProposal(tenantId: string, userId: string, dto: Partial<Proposal>) { return this.proposalRepo.save(this.proposalRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async updateProposalStatus(tenantId: string, id: string, status: ProposalStatus) { await this.proposalRepo.update({ id, tenantId }, { status }); return this.proposalRepo.findOne({ where: { id, tenantId } }); }

  // Contracts
  findContracts(tenantId: string) { return this.contractRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' } }); }
  createContract(tenantId: string, userId: string, dto: Partial<Contract>) { return this.contractRepo.save(this.contractRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async signContract(tenantId: string, id: string) { await this.contractRepo.update({ id, tenantId }, { eSignedAt: new Date() }); return this.contractRepo.findOne({ where: { id, tenantId } }); }
}
