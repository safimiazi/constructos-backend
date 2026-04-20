import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant, TenantStatus } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { Plan } from '../billing/entities/plan.entity';
import { Subscription } from '../billing/entities/subscription.entity';

@Injectable()
export class SuperadminService {
  constructor(
    @InjectRepository(Tenant) private tenantRepo: Repository<Tenant>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Plan) private planRepo: Repository<Plan>,
    @InjectRepository(Subscription) private subRepo: Repository<Subscription>,
  ) {}

  // ── Tenants ────────────────────────────────────────────────────────────────

  findTenants(q: { status?: string; search?: string; page?: number; limit?: number }) {
    const { status, search, page = 1, limit = 20 } = q;
    const qb = this.tenantRepo.createQueryBuilder('t')
      .orderBy('t.created_at', 'DESC')
      .skip((page - 1) * limit).take(limit);
    if (status) qb.andWhere('t.status = :status', { status });
    if (search) qb.andWhere('t.company_name ILIKE :s OR t.slug ILIKE :s', { s: `%${search}%` });
    return qb.getManyAndCount().then(([data, total]) => ({
      data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  }

  async findTenant(id: string) {
    const t = await this.tenantRepo.findOne({ where: { id } });
    if (!t) throw new NotFoundException('Tenant not found');
    return t;
  }

  async updateTenantStatus(id: string, status: TenantStatus) {
    await this.tenantRepo.update(id, { status });
    return this.findTenant(id);
  }

  async getDashboardStats() {
    const [totalTenants, activeCount, trialCount, suspendedCount, totalUsers] = await Promise.all([
      this.tenantRepo.count(),
      this.tenantRepo.count({ where: { status: TenantStatus.ACTIVE } }),
      this.tenantRepo.count({ where: { status: TenantStatus.TRIAL } }),
      this.tenantRepo.count({ where: { status: TenantStatus.SUSPENDED } }),
      this.userRepo.count(),
    ]);
    const recentTenants = await this.tenantRepo.find({ order: { createdAt: 'DESC' }, take: 5 });
    return { totalTenants, activeCount, trialCount, suspendedCount, totalUsers, recentTenants };
  }

  // ── Plans ──────────────────────────────────────────────────────────────────

  findPlans() {
    return this.planRepo.find({ where: { isActive: true }, order: { priceMonthly: 'ASC' } });
  }

  createPlan(dto: Partial<Plan>) {
    return this.planRepo.save(this.planRepo.create(dto));
  }

  async updatePlan(id: string, dto: Partial<Plan>) {
    await this.planRepo.update(id, dto);
    return this.planRepo.findOne({ where: { id } });
  }

  // ── Users (all platform) ───────────────────────────────────────────────────

  findAllUsers(q: { search?: string; page?: number; limit?: number }) {
    const { search, page = 1, limit = 20 } = q;
    const qb = this.userRepo.createQueryBuilder('u')
      .orderBy('u.created_at', 'DESC')
      .skip((page - 1) * limit).take(limit);
    if (search) qb.andWhere('u.email ILIKE :s OR u.first_name ILIKE :s OR u.last_name ILIKE :s', { s: `%${search}%` });
    return qb.getManyAndCount().then(([data, total]) => ({
      data: data.map(u => ({ ...u, passwordHash: undefined, refreshTokenHash: undefined })),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  }
}
