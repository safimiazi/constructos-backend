import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DocumentStatus } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(@InjectRepository(Document) private repo: Repository<Document>) {}

  findAll(tenantId: string, q: { projectId?: string; folder?: string; search?: string; page?: number; limit?: number }) {
    const { projectId, folder, search, page = 1, limit = 20 } = q;
    const qb = this.repo.createQueryBuilder('d')
      .where('d.tenant_id = :tenantId AND d.deleted_at IS NULL', { tenantId })
      .orderBy('d.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (projectId) qb.andWhere('d.project_id = :projectId', { projectId });
    if (folder) qb.andWhere('d.folder = :folder', { folder });
    if (search) qb.andWhere('d.name ILIKE :s', { s: `%${search}%` });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findOne(tenantId: string, id: string) {
    const d = await this.repo.findOne({ where: { id, tenantId } });
    if (!d) throw new NotFoundException('Document not found');
    return d;
  }

  create(tenantId: string, userId: string, dto: Partial<Document>) {
    return this.repo.save(this.repo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async update(tenantId: string, id: string, dto: Partial<Document>) {
    await this.findOne(tenantId, id);
    await this.repo.update({ id, tenantId }, dto);
    return this.findOne(tenantId, id);
  }

  async approve(tenantId: string, id: string) {
    await this.repo.update({ id, tenantId }, { status: DocumentStatus.APPROVED });
    return this.findOne(tenantId, id);
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    await this.repo.softDelete({ id, tenantId });
  }

  getFolders(tenantId: string) {
    return this.repo.createQueryBuilder('d')
      .select('DISTINCT d.folder', 'folder')
      .where('d.tenant_id = :tenantId AND d.folder IS NOT NULL AND d.deleted_at IS NULL', { tenantId })
      .getRawMany();
  }
}
