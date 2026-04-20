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
const tenant_entity_1 = require("../tenants/entities/tenant.entity");
const user_entity_1 = require("../users/entities/user.entity");
const plan_entity_1 = require("../billing/entities/plan.entity");
const subscription_entity_1 = require("../billing/entities/subscription.entity");
let SuperadminService = class SuperadminService {
    tenantRepo;
    userRepo;
    planRepo;
    subRepo;
    constructor(tenantRepo, userRepo, planRepo, subRepo) {
        this.tenantRepo = tenantRepo;
        this.userRepo = userRepo;
        this.planRepo = planRepo;
        this.subRepo = subRepo;
    }
    findTenants(q) {
        const { status, search, page = 1, limit = 20 } = q;
        const qb = this.tenantRepo.createQueryBuilder('t')
            .orderBy('t.created_at', 'DESC')
            .skip((page - 1) * limit).take(limit);
        if (status)
            qb.andWhere('t.status = :status', { status });
        if (search)
            qb.andWhere('t.company_name ILIKE :s OR t.slug ILIKE :s', { s: `%${search}%` });
        return qb.getManyAndCount().then(([data, total]) => ({
            data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        }));
    }
    async findTenant(id) {
        const t = await this.tenantRepo.findOne({ where: { id } });
        if (!t)
            throw new common_1.NotFoundException('Tenant not found');
        return t;
    }
    async updateTenantStatus(id, status) {
        await this.tenantRepo.update(id, { status });
        return this.findTenant(id);
    }
    async getDashboardStats() {
        const [totalTenants, activeCount, trialCount, suspendedCount, totalUsers] = await Promise.all([
            this.tenantRepo.count(),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.ACTIVE } }),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.TRIAL } }),
            this.tenantRepo.count({ where: { status: tenant_entity_1.TenantStatus.SUSPENDED } }),
            this.userRepo.count(),
        ]);
        const recentTenants = await this.tenantRepo.find({ order: { createdAt: 'DESC' }, take: 5 });
        return { totalTenants, activeCount, trialCount, suspendedCount, totalUsers, recentTenants };
    }
    findPlans() {
        return this.planRepo.find({ where: { isActive: true }, order: { priceMonthly: 'ASC' } });
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
        const qb = this.userRepo.createQueryBuilder('u')
            .orderBy('u.created_at', 'DESC')
            .skip((page - 1) * limit).take(limit);
        if (search)
            qb.andWhere('u.email ILIKE :s OR u.first_name ILIKE :s OR u.last_name ILIKE :s', { s: `%${search}%` });
        return qb.getManyAndCount().then(([data, total]) => ({
            data: data.map(u => ({ ...u, passwordHash: undefined, refreshTokenHash: undefined })),
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        }));
    }
};
exports.SuperadminService = SuperadminService;
exports.SuperadminService = SuperadminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __param(3, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SuperadminService);
//# sourceMappingURL=superadmin.service.js.map