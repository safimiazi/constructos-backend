import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}

  log(dto: Partial<AuditLog>) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll(q: { tenantId?: string; userId?: string; action?: string; page?: number; limit?: number }) {
    const { tenantId, userId, action, page = 1, limit = 20 } = q;
    const qb = this.repo.createQueryBuilder('a')
      .orderBy('a.created_at', 'DESC')
      .skip((page - 1) * limit).take(limit);
    if (tenantId) qb.andWhere('a.tenant_id = :tenantId', { tenantId });
    if (userId) qb.andWhere('a.user_id = :userId', { userId });
    if (action) qb.andWhere('a.action ILIKE :action', { action: `%${action}%` });
    return qb.getManyAndCount().then(([data, total]) => ({
      data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  }
}
