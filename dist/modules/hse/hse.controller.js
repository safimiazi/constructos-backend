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
exports.HseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hse_service_1 = require("./hse.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let HseController = class HseController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    findAll(u, q) { return this.svc.findAll(u.tenantId, q); }
    getStats(u) { return this.svc.getStats(u.tenantId); }
    create(u, dto) { return this.svc.create(u.tenantId, u.sub, dto); }
    findOne(u, id) { return this.svc.findOne(u.tenantId, id); }
    update(u, id, dto) { return this.svc.update(u.tenantId, id, dto); }
    close(u, id) { return this.svc.close(u.tenantId, id); }
};
exports.HseController = HseController;
__decorate([
    (0, common_1.Get)('incidents'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('incidents/stats'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HseController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('incidents'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('incidents/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('incidents/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HseController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('incidents/:id/close'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HseController.prototype, "close", null);
exports.HseController = HseController = __decorate([
    (0, swagger_1.ApiTags)('HSE'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('hse'),
    __metadata("design:paramtypes", [hse_service_1.HseService])
], HseController);
//# sourceMappingURL=hse.controller.js.map