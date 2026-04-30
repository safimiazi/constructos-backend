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
exports.TenantGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_entity_1 = require("../../modules/tenants/entities/tenant.entity");
let TenantGuard = class TenantGuard {
    tenantRepo;
    dataSource;
    constructor(tenantRepo, dataSource) {
        this.tenantRepo = tenantRepo;
        this.dataSource = dataSource;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user?.isSuperAdmin)
            return true;
        const tenantId = user?.tenantId;
        if (!tenantId)
            throw new common_1.UnauthorizedException('No tenant context');
        const tenant = await this.tenantRepo.findOne({ where: { id: tenantId } });
        if (!tenant)
            throw new common_1.UnauthorizedException('Tenant not found');
        if (tenant.status === tenant_entity_1.TenantStatus.SUSPENDED) {
            throw new common_1.ForbiddenException('Tenant account is suspended');
        }
        if (tenant.status === tenant_entity_1.TenantStatus.CANCELLED) {
            throw new common_1.ForbiddenException('Tenant account is cancelled');
        }
        request.tenant = tenant;
        await this.dataSource.query(`SET LOCAL "app.tenant_id" = $1`, [tenantId]);
        return true;
    }
};
exports.TenantGuard = TenantGuard;
exports.TenantGuard = TenantGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], TenantGuard);
//# sourceMappingURL=tenant.guard.js.map