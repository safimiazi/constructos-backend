import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tenant, TenantStatus } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { Plan } from '../billing/entities/plan.entity';
import { Subscription } from '../billing/entities/subscription.entity';
import { Announcement } from './entities/announcement.entity';

@Injectable()
export class SuperadminService {
  constructor(
    @InjectRepository(Tenant) private tenantRepo: Repository<Tenant>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Plan) private planRepo: Repository<Plan>,
    @InjectRepository(Subscription) private subRepo: Repository<Subscription>,
    @InjectRepository(Announcement) private annoRepo: Repository<Announcement>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Tenants
  findTenants(q: { status?: string; search?: string; page?: number; limit?: number }) {
    const { status, search, page = 1, limit = 20 } = q;
    const qb = this.tenantRepo.createQueryBuilder('t').orderBy('t.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (status) qb.andWhere('t.status = :status', { status });
    if (search) qb.andWhere('t.company_name ILIKE :s OR t.slug ILIKE :s', { s: `%${search}%` });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findTenant(id: string) {
    const t = await this.tenantRepo.findOne({ where: { id } });
    if (!t) throw new NotFoundException('Tenant not found');
    return t;
  }

  async createTenant(dto: Partial<Tenant>) {
    return this.tenantRepo.save(this.tenantRepo.create(dto));
  }

  async updateTenantStatus(id: string, status: TenantStatus) {
    await this.tenantRepo.update(id, { status });
    return this.findTenant(id);
  }

  async impersonateTenant(tenantId: string) {
    const tenant = await this.findTenant(tenantId);
    const owner = await this.userRepo.findOne({ where: { tenantId, role: 'OWNER' as any } });
    if (!owner) throw new NotFoundException('Tenant owner not found');
    const payload = { sub: owner.id, tenantId: owner.tenantId, role: owner.role, planTier: null, isSuperAdmin: false, email: owner.email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h', secret: this.configService.get('JWT_SECRET') });
    return { accessToken: token, tenant: { id: tenant.id, companyName: tenant.companyName }, user: { id: owner.id, email: owner.email, role: owner.role } };
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

  getBillingOverview() {
    return this.subRepo.createQueryBuilder('s')
      .select('s.status', 'status').addSelect('COUNT(*)', 'count')
      .groupBy('s.status').getRawMany()
      .then(rows => ({ subscriptionsByStatus: rows }));
  }

  getGrowthAnalytics() {
    return this.tenantRepo.createQueryBuilder('t')
      .select("TO_CHAR(t.created_at, 'YYYY-MM')", 'month')
      .addSelect('COUNT(*)', 'signups')
      .groupBy("TO_CHAR(t.created_at, 'YYYY-MM')")
      .orderBy("TO_CHAR(t.created_at, 'YYYY-MM')", 'DESC')
      .limit(12)
      .getRawMany();
  }

  // Plans
  findPlans() { return this.planRepo.find({ where: { isActive: true }, order: { priceMonthly: 'ASC' } }); }
  createPlan(dto: Partial<Plan>) { return this.planRepo.save(this.planRepo.create(dto)); }
  async updatePlan(id: string, dto: Partial<Plan>) { await this.planRepo.update(id, dto); return this.planRepo.findOne({ where: { id } }); }

  // Users
  findAllUsers(q: { search?: string; page?: number; limit?: number }) {
    const { search, page = 1, limit = 20 } = q;
    const qb = this.userRepo.createQueryBuilder('u').orderBy('u.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (search) qb.andWhere('u.email ILIKE :s OR u.first_name ILIKE :s OR u.last_name ILIKE :s', { s: `%${search}%` });
    return qb.getManyAndCount().then(([data, total]) => ({
      data: data.map(u => { const { passwordHash, refreshTokenHash, ...rest } = u as any; return rest; }),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  }

  // Announcements
  findAnnouncements() { return this.annoRepo.find({ order: { createdAt: 'DESC' } }); }
  createAnnouncement(dto: Partial<Announcement>) { return this.annoRepo.save(this.annoRepo.create(dto)); }
  async updateAnnouncement(id: string, dto: Partial<Announcement>) { await this.annoRepo.update(id, dto); return this.annoRepo.findOne({ where: { id } }); }
  async deleteAnnouncement(id: string) { await this.annoRepo.softDelete(id); }

  getActiveAnnouncements() {
    return this.annoRepo.createQueryBuilder('a')
      .where('a.is_active = true AND (a.expires_at IS NULL OR a.expires_at > NOW()) AND a.deleted_at IS NULL')
      .orderBy('a.created_at', 'DESC')
      .getMany();
  }
}
