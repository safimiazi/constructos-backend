import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserStatus } from './entities/user.entity';
import { UserRole } from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll(tenantId: string, q: { search?: string; role?: string; page?: number; limit?: number }) {
    const { search, role, page = 1, limit = 20 } = q;
    const qb = this.repo.createQueryBuilder('u')
      .where('u.tenant_id = :tenantId AND u.deleted_at IS NULL', { tenantId })
      .orderBy('u.created_at', 'DESC')
      .skip((page - 1) * limit).take(limit);
    if (search) qb.andWhere('(u.email ILIKE :s OR u.first_name ILIKE :s OR u.last_name ILIKE :s)', { s: `%${search}%` });
    if (role) qb.andWhere('u.role = :role', { role });
    return qb.getManyAndCount().then(([data, total]) => ({
      data: data.map(u => this.sanitize(u)),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  }

  async findOne(tenantId: string, id: string) {
    const u = await this.repo.findOne({ where: { id, tenantId } });
    if (!u) throw new NotFoundException('User not found');
    return this.sanitize(u);
  }

  async invite(tenantId: string, dto: { email: string; firstName: string; lastName: string; role: UserRole; password: string }) {
    const exists = await this.repo.findOne({ where: { email: dto.email, tenantId } });
    if (exists) throw new ConflictException('Email already exists in this tenant');
    const u = this.repo.create({
      ...dto,
      tenantId,
      passwordHash: dto.password,
      status: UserStatus.ACTIVE,
    });
    const saved = await this.repo.save(u);
    return this.sanitize(saved);
  }

  async update(tenantId: string, id: string, dto: Partial<User>) {
    await this.findOne(tenantId, id);
    if ((dto as any).password) {
      (dto as any).passwordHash = await bcrypt.hash((dto as any).password, 12);
      delete (dto as any).password;
    }
    await this.repo.update({ id, tenantId }, dto);
    return this.findOne(tenantId, id);
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    await this.repo.softDelete({ id, tenantId });
  }

  async getProfile(userId: string) {
    const u = await this.repo.findOne({ where: { id: userId } });
    if (!u) throw new NotFoundException('User not found');
    return this.sanitize(u);
  }

  private sanitize(u: User) {
    const { passwordHash, refreshTokenHash, ...rest } = u as any;
    return rest;
  }
}
