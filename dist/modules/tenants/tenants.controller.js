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
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tenants_service_1 = require("./tenants.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let TenantsController = class TenantsController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    getCompany(u) {
        return this.svc.getCompany(u.tenantId);
    }
    updateCompany(u, dto) {
        return this.svc.updateCompany(u.tenantId, dto);
    }
    getBranches(u) {
        return this.svc.findBranches(u.tenantId);
    }
    createBranch(u, dto) {
        return this.svc.createBranch(u.tenantId, u.sub, dto);
    }
    updateBranch(u, id, dto) {
        return this.svc.updateBranch(u.tenantId, id, dto);
    }
    removeBranch(u, id) {
        return this.svc.removeBranch(u.tenantId, id);
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getCompany", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Get)('branches'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getBranches", null);
__decorate([
    (0, common_1.Post)('branches'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "createBranch", null);
__decorate([
    (0, common_1.Patch)('branches/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "updateBranch", null);
__decorate([
    (0, common_1.Delete)('branches/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "removeBranch", null);
exports.TenantsController = TenantsController = __decorate([
    (0, swagger_1.ApiTags)('Company'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService])
], TenantsController);
//# sourceMappingURL=tenants.controller.js.map