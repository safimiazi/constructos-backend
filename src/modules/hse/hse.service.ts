import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident, IncidentStatus } from './entities/incident.entity';
import { PermitToWork, PTWStatus, SafetyChecklist } from './entities/ptw.entity';

@Injectable()
export class HseService {
  constructor(
    @InjectRepository(Incident) private incidentRepo: Repository<Incident>,
    @InjectRepository(PermitToWork) private ptwRepo: Repository<PermitToWork>,
    @InjectRepository(SafetyChecklist) private checklistRepo: Repository<SafetyChecklist>,
  ) {}

  // Incidents
  findAll(tenantId: string, q: { projectId?: string; status?: string; page?: number; limit?: number }) {
    const { projectId, status, page = 1, limit = 20 } = q;
    const qb = this.incidentRepo.createQueryBuilder('i')
      .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
      .orderBy('i.incident_date', 'DESC').skip((page - 1) * limit).take(limit);
    if (projectId) qb.andWhere('i.project_id = :projectId', { projectId });
    if (status) qb.andWhere('i.status = :status', { status });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findOne(tenantId: string, id: string) {
    const i = await this.incidentRepo.findOne({ where: { id, tenantId } });
    if (!i) throw new NotFoundException('Incident not found');
    return i;
  }

  create(tenantId: string, userId: string, dto: Partial<Incident>) { return this.incidentRepo.save(this.incidentRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async update(tenantId: string, id: string, dto: Partial<Incident>) { await this.findOne(tenantId, id); await this.incidentRepo.update({ id, tenantId }, dto); return this.findOne(tenantId, id); }
  async close(tenantId: string, id: string) { await this.incidentRepo.update({ id, tenantId }, { status: IncidentStatus.CLOSED }); return this.findOne(tenantId, id); }

  getStats(tenantId: string) {
    return this.incidentRepo.createQueryBuilder('i')
      .select('i.type', 'type').addSelect('i.severity', 'severity').addSelect('COUNT(*)', 'count')
      .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
      .groupBy('i.type, i.severity').getRawMany();
  }

  getHSEDashboard(tenantId: string) {
    return Promise.all([
      this.incidentRepo.count({ where: { tenantId, status: IncidentStatus.OPEN } }),
      this.incidentRepo.count({ where: { tenantId } }),
      this.ptwRepo.count({ where: { tenantId, status: PTWStatus.ACTIVE } }),
      this.checklistRepo.count({ where: { tenantId } }),
    ]).then(([openIncidents, totalIncidents, activePTW, totalChecklists]) => ({
      openIncidents, totalIncidents, activePTW, totalChecklists,
    }));
  }

  // Permits to Work
  findPTWs(tenantId: string, q: { projectId?: string; status?: string }) {
    const qb = this.ptwRepo.createQueryBuilder('p').where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId }).orderBy('p.valid_from', 'DESC');
    if (q.projectId) qb.andWhere('p.project_id = :projectId', { projectId: q.projectId });
    if (q.status) qb.andWhere('p.status = :status', { status: q.status });
    return qb.getMany();
  }

  createPTW(tenantId: string, userId: string, dto: Partial<PermitToWork>) { return this.ptwRepo.save(this.ptwRepo.create({ ...dto, tenantId, issuedBy: userId, createdBy: userId })); }
  async updatePTW(tenantId: string, id: string, dto: Partial<PermitToWork>) { await this.ptwRepo.update({ id, tenantId }, dto); return this.ptwRepo.findOne({ where: { id, tenantId } }); }
  async closePTW(tenantId: string, id: string) { await this.ptwRepo.update({ id, tenantId }, { status: PTWStatus.CLOSED }); return this.ptwRepo.findOne({ where: { id, tenantId } }); }

  // Safety Checklists
  findChecklists(tenantId: string, projectId?: string) {
    const where: any = { tenantId };
    if (projectId) where.projectId = projectId;
    return this.checklistRepo.find({ where, order: { date: 'DESC' } });
  }

  createChecklist(tenantId: string, userId: string, dto: Partial<SafetyChecklist>) { return this.checklistRepo.save(this.checklistRepo.create({ ...dto, tenantId, conductedBy: userId, createdBy: userId })); }

  async submitChecklist(tenantId: string, id: string, responses: { question: string; answer: boolean; notes?: string }[]) {
    const score = Math.round(responses.filter(r => r.answer).length / responses.length * 100);
    await this.checklistRepo.update({ id, tenantId }, { items: responses, score, status: 'completed' });
    return this.checklistRepo.findOne({ where: { id, tenantId } });
  }
}
