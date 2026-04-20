import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident, IncidentStatus } from './entities/incident.entity';

@Injectable()
export class HseService {
  constructor(@InjectRepository(Incident) private repo: Repository<Incident>) {}

  findAll(tenantId: string, q: { projectId?: string; status?: string; page?: number; limit?: number }) {
    const { projectId, status, page = 1, limit = 20 } = q;
    const qb = this.repo.createQueryBuilder('i')
      .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
      .orderBy('i.incident_date', 'DESC').skip((page - 1) * limit).take(limit);
    if (projectId) qb.andWhere('i.project_id = :projectId', { projectId });
    if (status) qb.andWhere('i.status = :status', { status });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findOne(tenantId: string, id: string) {
    const i = await this.repo.findOne({ where: { id, tenantId } });
    if (!i) throw new NotFoundException('Incident not found');
    return i;
  }

  create(tenantId: string, userId: string, dto: Partial<Incident>) {
    return this.repo.save(this.repo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async update(tenantId: string, id: string, dto: Partial<Incident>) {
    await this.findOne(tenantId, id);
    await this.repo.update({ id, tenantId }, dto);
    return this.findOne(tenantId, id);
  }

  async close(tenantId: string, id: string) {
    await this.repo.update({ id, tenantId }, { status: IncidentStatus.CLOSED });
    return this.findOne(tenantId, id);
  }

  getStats(tenantId: string) {
    return this.repo.createQueryBuilder('i')
      .select('i.type', 'type').addSelect('i.severity', 'severity').addSelect('COUNT(*)', 'count')
      .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
      .groupBy('i.type, i.severity').getRawMany();
  }
}
