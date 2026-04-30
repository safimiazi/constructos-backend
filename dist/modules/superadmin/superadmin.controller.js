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
exports.SuperadminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const superadmin_service_1 = require("./superadmin.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const jwt_payload_interface_1 = require("../../common/interfaces/jwt-payload.interface");
let SuperadminController = class SuperadminController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    getStats() { return this.svc.getDashboardStats(); }
    getBillingOverview() { return this.svc.getBillingOverview(); }
    getGrowth() { return this.svc.getGrowthAnalytics(); }
    getTenantStatus() { return this.svc.getTenantStatusBreakdown(); }
    getPlanDist() { return this.svc.getPlanDistribution(); }
    getTopTenants() { return this.svc.getTopTenants(); }
    findTenants(q) { return this.svc.findTenants(q); }
    createTenant(dto) { return this.svc.createTenant(dto); }
    findTenant(id) { return this.svc.findTenant(id); }
    updateStatus(id, dto) { return this.svc.updateTenantStatus(id, dto.status); }
    impersonate(id) { return this.svc.impersonateTenant(id); }
    findPlans() { return this.svc.findPlans(); }
    createPlan(dto) { return this.svc.createPlan(dto); }
    updatePlan(id, dto) { return this.svc.updatePlan(id, dto); }
    findAllUsers(q) { return this.svc.findAllUsers(q); }
    getActiveAnnouncements() { return this.svc.getActiveAnnouncements(); }
    getAnnouncementsForTenant(user) {
        if (!user?.tenantId)
            throw new Error('No tenant context');
        return this.svc.getActiveAnnouncementsForTenant(user.tenantId);
    }
    findAnnouncements() { return this.svc.findAnnouncements(); }
    createAnnouncement(dto) { return this.svc.createAnnouncement(dto); }
    updateAnnouncement(id, dto) { return this.svc.updateAnnouncement(id, dto); }
    deleteAnnouncement(id) { return this.svc.deleteAnnouncement(id); }
};
exports.SuperadminController = SuperadminController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('billing/overview'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "getBillingOverview", null);
__decorate([
    (0, common_1.Get)('analytics/growth'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "getGrowth", null);
__decorate([
    (0, common_1.Get)('analytics/tenant-status'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "getTenantStatus", null);
__decorate([
    (0, common_1.Get)('analytics/plan-distribution'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "getPlanDist", null);
__decorate([
    (0, common_1.Get)('analytics/top-tenants'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "getTopTenants", null);
__decorate([
    (0, common_1.Get)('tenants'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "findTenants", null);
__decorate([
    (0, common_1.Post)('tenants'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "createTenant", null);
__decorate([
    (0, common_1.Get)('tenants/:id'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "findTenant", null);
__decorate([
    (0, common_1.Patch)('tenants/:id/status'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('tenants/:id/impersonate'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "impersonate", null);
__decorate([
    (0, common_1.Get)('plans'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "findPlans", null);
__decorate([
    (0, common_1.Post)('plans'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Patch)('plans/:id'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "updatePlan", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "findAllUsers", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('announcements/active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "getActiveAnnouncements", null);
__decorate([
    (0, common_1.Get)('announcements/tenant'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "getAnnouncementsForTenant", null);
__decorate([
    (0, common_1.Get)('announcements'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "findAnnouncements", null);
__decorate([
    (0, common_1.Post)('announcements'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "createAnnouncement", null);
__decorate([
    (0, common_1.Patch)('announcements/:id'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "updateAnnouncement", null);
__decorate([
    (0, common_1.Delete)('announcements/:id'),
    (0, roles_decorator_1.Roles)(jwt_payload_interface_1.UserRole.SUPERADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperadminController.prototype, "deleteAnnouncement", null);
exports.SuperadminController = SuperadminController = __decorate([
    (0, swagger_1.ApiTags)('SuperAdmin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('superadmin'),
    __metadata("design:paramtypes", [superadmin_service_1.SuperadminService])
], SuperadminController);
//# sourceMappingURL=superadmin.controller.js.map