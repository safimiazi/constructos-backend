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
exports.ProcurementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const procurement_service_1 = require("./procurement.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let ProcurementController = class ProcurementController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    findVendors(u, q) { return this.svc.findVendors(u.tenantId, q); }
    createVendor(u, dto) { return this.svc.createVendor(u.tenantId, u.sub, dto); }
    findVendor(u, id) { return this.svc.findVendor(u.tenantId, id); }
    updateVendor(u, id, dto) { return this.svc.updateVendor(u.tenantId, id, dto); }
    removeVendor(u, id) { return this.svc.removeVendor(u.tenantId, id); }
    findPOs(u, q) { return this.svc.findPOs(u.tenantId, q); }
    createPO(u, dto) { return this.svc.createPO(u.tenantId, u.sub, dto); }
    findPO(u, id) { return this.svc.findPO(u.tenantId, id); }
    updatePO(u, id, dto) { return this.svc.updatePO(u.tenantId, id, dto); }
    removePO(u, id) { return this.svc.removePO(u.tenantId, id); }
    findMRs(u, q) { return this.svc.findMRs(u.tenantId, q); }
    createMR(u, dto) { return this.svc.createMR(u.tenantId, u.sub, dto); }
    approveMR(u, id) { return this.svc.approveMR(u.tenantId, id, u.sub); }
    rejectMR(u, id) { return this.svc.rejectMR(u.tenantId, id); }
    findRFQs(u) { return this.svc.findRFQs(u.tenantId); }
    createRFQ(u, dto) { return this.svc.createRFQ(u.tenantId, u.sub, dto); }
    awardRFQ(u, id, dto) { return this.svc.awardRFQ(u.tenantId, id, dto.vendorId); }
    findGRNs(u, poId) { return this.svc.findGRNs(u.tenantId, poId); }
    createGRN(u, dto) { return this.svc.createGRN(u.tenantId, u.sub, dto); }
    findInventory(u, q) { return this.svc.findInventory(u.tenantId, q); }
    createItem(u, dto) { return this.svc.createInventoryItem(u.tenantId, u.sub, dto); }
    updateItem(u, id, dto) { return this.svc.updateInventoryItem(u.tenantId, id, dto); }
    transferStock(u, dto) { return this.svc.transferStock(u.tenantId, dto.id, dto.qty, dto.toLocation); }
    findMatches(u) { return this.svc.findMatches(u.tenantId); }
    createMatch(u, dto) { return this.svc.createThreeWayMatch(u.tenantId, u.sub, dto); }
    getSpend(u) { return this.svc.getSpendAnalytics(u.tenantId); }
};
exports.ProcurementController = ProcurementController;
__decorate([
    (0, common_1.Get)('vendors'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findVendors", null);
__decorate([
    (0, common_1.Post)('vendors'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "createVendor", null);
__decorate([
    (0, common_1.Get)('vendors/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findVendor", null);
__decorate([
    (0, common_1.Patch)('vendors/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "updateVendor", null);
__decorate([
    (0, common_1.Delete)('vendors/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "removeVendor", null);
__decorate([
    (0, common_1.Get)('purchase-orders'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findPOs", null);
__decorate([
    (0, common_1.Post)('purchase-orders'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "createPO", null);
__decorate([
    (0, common_1.Get)('purchase-orders/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findPO", null);
__decorate([
    (0, common_1.Patch)('purchase-orders/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "updatePO", null);
__decorate([
    (0, common_1.Delete)('purchase-orders/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "removePO", null);
__decorate([
    (0, common_1.Get)('material-requests'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findMRs", null);
__decorate([
    (0, common_1.Post)('material-requests'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "createMR", null);
__decorate([
    (0, common_1.Patch)('material-requests/:id/approve'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "approveMR", null);
__decorate([
    (0, common_1.Patch)('material-requests/:id/reject'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "rejectMR", null);
__decorate([
    (0, common_1.Get)('rfqs'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findRFQs", null);
__decorate([
    (0, common_1.Post)('rfqs'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "createRFQ", null);
__decorate([
    (0, common_1.Post)('rfqs/:id/award'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "awardRFQ", null);
__decorate([
    (0, common_1.Get)('grn'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('poId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findGRNs", null);
__decorate([
    (0, common_1.Post)('grn'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "createGRN", null);
__decorate([
    (0, common_1.Get)('inventory'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findInventory", null);
__decorate([
    (0, common_1.Post)('inventory'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "createItem", null);
__decorate([
    (0, common_1.Patch)('inventory/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Post)('inventory/transfer'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "transferStock", null);
__decorate([
    (0, common_1.Get)('three-way-match'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "findMatches", null);
__decorate([
    (0, common_1.Post)('three-way-match'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "createMatch", null);
__decorate([
    (0, common_1.Get)('analytics/spend'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProcurementController.prototype, "getSpend", null);
exports.ProcurementController = ProcurementController = __decorate([
    (0, swagger_1.ApiTags)('Procurement'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('procurement'),
    __metadata("design:paramtypes", [procurement_service_1.ProcurementService])
], ProcurementController);
//# sourceMappingURL=procurement.controller.js.map