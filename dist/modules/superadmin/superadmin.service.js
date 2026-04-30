"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperadminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const tenant_entity_1 = require("../tenants/entities/tenant.entity");
const user_entity_1 = require("../users/entities/user.entity");
const plan_entity_1 = require("../billing/entities/plan.entity");
const subscription_entity_1 = require("../billing/entities/subscription.entity");
const announcement_entity_1 = require("./entities/announcement.entity");
let SuperadminService = class SuperadminService {
    tenantRepo;
    userRepo;
    planRepo;
    subRepo;
    annoRepo;
    jwtService;
    configService;
    constructor(tenantRepo, userRepo, planRepo, subRepo, annoRepo, jwtService, configService) {
        this.tenantRepo = tenantRepo;
        this.userRepo = userRepo;
        this.planRepo = planRepo;
        this.subRepo = subRepo;
        this.annoRepo = annoRepo;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    findTenants(q) {
        const { status, search, page = 1, limit = 20 } = q;
        const qb = this.tenantRepo
            .createQueryBuilder('t')
            .orderBy('t.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (status)
            qb.andWhere('t.status = :status', { status });
        if (search)
            qb.andWhere('t.company_name ILIKE :s OR t.slug ILIKE :s', {
                s: `%${search}%`,
            });
        return qb.getManyAndCount().then(([data, total]) => ({
            data,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        }));
    }
    async findTenant(id) {
        const t = await this.tenantRepo.findOne({ where: { id } });
        if (!t)
            throw new common_1.NotFoundException('Tenant not found');
        return t;
    }
    async createTenant(dto) {
        return this.tenantRepo.save(this.tenantRepo.create(dto));
    }
    async updateTenantStatus(id, status) {
        await this.tenantRepo.update(id, { status });
        return this.findTenant(id);
    }
    async impersonateTenant(tenantId) {
        const tenant = await this.findTenant(tenantId);
        const owner = await this.userRepo.findOne({
            where: { tenantId, role: 'OWNER' },
        });
        if (!owner)
            throw new common_1.NotFoundException('Tenant owner not found');
        const payload = {
            sub: owner.id,
            tenantId: owner.tenantId,
            role: owner.role,
            planTier: null,
            isSuperAdmin: false,
            email: owner.email,
        };
        const token = this.jwtService.sign(payload, {
            expiresIn: '1h',
            secret: this.configService.get('JWT_SECRET'),
        });
        return {
            accessToken: token,
            tenant: { id: tenant.id, companyName: tenant.companyName },
            user: { id: owner.id, email: owner.email, role: owner.role },
        };
    }
    async getDashboardStats() {
        const [totalTenants, activeCount, trialCount, suspendedCount, cancelledCount, totalUsers,] = await Promise.all([
            this.tenantRepo.count(),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.ACTIVE } }),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.TRIAL } }),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.SUSPENDED } }),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.CANCELLED } }),
            this.userRepo.count(),
        ]);
        const recentTenants = await this.tenantRepo.find({
            order: { createdAt: 'DESC' },
            take: 6,
        });
        const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const expiringTrials = await this.tenantRepo
            .createQueryBuilder('t')
            .where('t.status = :s AND t.trial_ends_at IS NOT NULL AND t.trial_ends_at <= :d AND t.trial_ends_at > NOW()', { s: tenant_entity_1.TenantStatus.TRIAL, d: thirtyDaysFromNow })
            .orderBy('t.trial_ends_at', 'ASC')
            .getMany();
        return {
            totalTenants,
            activeCount,
            trialCount,
            suspendedCount,
            cancelledCount,
            totalUsers,
            recentTenants,
            expiringTrials,
        };
    }
    getBillingOverview() {
        return this.subRepo
            .createQueryBuilder('s')
            .select('s.status', 'status')
            .addSelect('COUNT(*)', 'count')
            .groupBy('s.status')
            .getRawMany()
            .then((rows) => ({ subscriptionsByStatus: rows }));
    }
    async getGrowthAnalytics() {
        const monthly = await this.tenantRepo
            .createQueryBuilder('t')
            .select("TO_CHAR(t.created_at, 'YYYY-MM')", 'month')
            .addSelect('COUNT(*)', 'signups')
            .groupBy("TO_CHAR(t.created_at, 'YYYY-MM')")
            .orderBy("TO_CHAR(t.created_at, 'YYYY-MM')", 'ASC')
            .limit(12)
            .getRawMany();
        let cumulative = 0;
        const withCumulative = monthly.map((m) => {
            cumulative += Number(m.signups);
            return { ...m, signups: Number(m.signups), total: cumulative };
        });
        return withCumulative;
    }
    async getTenantStatusBreakdown() {
        const [active, trial, suspended, cancelled] = await Promise.all([
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.ACTIVE } }),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.TRIAL } }),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.SUSPENDED } }),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.CANCELLED } }),
        ]);
        return [
            { name: 'Active', value: active, color: '#22c55e' },
            { name: 'Trial', value: trial, color: '#9333ea' },
            { name: 'Suspended', value: suspended, color: '#f59e0b' },
            { name: 'Cancelled', value: cancelled, color: '#ef4444' },
        ];
    }
    async getPlanDistribution() {
        const plans = await this.planRepo.find({ where: { isActive: true } });
        const result = await Promise.all(plans.map(async (p) => {
            const count = await this.tenantRepo
                .createQueryBuilder('t')
                .innerJoin('subscriptions', 's', 's.tenant_id = t.id AND s.plan_id = :pid', { pid: p.id })
                .getCount();
            return { name: p.name, tier: p.tier, count };
        }));
        const colors = {
            ENTERPRISE: '#9333ea',
            PROFESSIONAL: '#3b82f6',
            STARTER: '#22c55e',
        };
        return result.map((r) => ({ ...r, color: colors[r.tier] ?? '#6b7280' }));
    }
    async getTopTenants() {
        const tenants = await this.tenantRepo.find({
            where: { status: tenant_entity_1.TenantStatus.ACTIVE },
            order: { createdAt: 'ASC' },
            take: 10,
        });
        return Promise.all(tenants.map(async (t) => {
            const userCount = await this.userRepo.count({
                where: { tenantId: t.id },
            });
            const sub = await this.subRepo
                .createQueryBuilder('s')
                .leftJoinAndSelect('plans', 'p', 'p.id = s.plan_id')
                .where('s.tenant_id = :tid', { tid: t.id })
                .getRawOne();
            return {
                id: t.id,
                name: t.companyName,
                slug: t.slug,
                status: t.status,
                users: userCount,
                planName: sub?.p_name ?? 'No plan',
                planTier: sub?.p_tier ?? null,
                joinedAt: t.createdAt,
            };
        }));
    }
    findPlans() {
        return this.planRepo.find({
            where: { isActive: true },
            order: { priceMonthly: 'ASC' },
        });
    }
    createPlan(dto) {
        return this.planRepo.save(this.planRepo.create(dto));
    }
    async updatePlan(id, dto) {
        await this.planRepo.update(id, dto);
        return this.planRepo.findOne({ where: { id } });
    }
    findAllUsers(q) {
        const { search, page = 1, limit = 20 } = q;
        const qb = this.userRepo
            .createQueryBuilder('u')
            .orderBy('u.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        if (search)
            qb.andWhere('u.email ILIKE :s OR u.first_name ILIKE :s OR u.last_name ILIKE :s', { s: `%${search}%` });
        return qb.getManyAndCount().then(([data, total]) => ({
            data: data.map((u) => {
                const { passwordHash, refreshTokenHash, ...rest } = u;
                return rest;
            }),
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        }));
    }
    findAnnouncements() {
        return this.annoRepo.find({ order: { createdAt: 'DESC' } });
    }
    createAnnouncement(dto) {
        return this.annoRepo.save(this.annoRepo.create(dto));
    }
    async updateAnnouncement(id, dto) {
        await this.annoRepo.update(id, dto);
        return this.annoRepo.findOne({ where: { id } });
    }
    async deleteAnnouncement(id) {
        await this.annoRepo.softDelete(id);
    }
    getActiveAnnouncements() {
        return this.annoRepo
            .createQueryBuilder('a')
            .where('a.is_active = true AND (a.expires_at IS NULL OR a.expires_at > NOW()) AND a.deleted_at IS NULL')
            .orderBy('a.created_at', 'DESC')
            .getMany();
    }
    getActiveAnnouncementsForTenant(tenantId) {
        return this.annoRepo
            .createQueryBuilder('a')
            .where('a.is_active = true AND (a.expires_at IS NULL OR a.expires_at > NOW()) AND a.deleted_at IS NULL')
            .andWhere("(a.target_tenant_ids = '[]' OR a.target_tenant_ids::text LIKE :tenantId)", { tenantId: `%${tenantId}%` })
            .orderBy('a.created_at', 'DESC')
            .getMany();
    }
};
exports.SuperadminService = SuperadminService;
exports.SuperadminService = SuperadminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __param(3, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(4, (0, typeorm_1.InjectRepository)(announcement_entity_1.Announcement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], SuperadminService);
//# sourceMappingURL=superadmin.service.js.map