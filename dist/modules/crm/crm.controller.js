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
exports.CrmController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crm_service_1 = require("./crm.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let CrmController = class CrmController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    findClients(u, q) { return this.svc.findClients(u.tenantId, q); }
    createClient(u, dto) { return this.svc.createClient(u.tenantId, u.sub, dto); }
    findClient(u, id) { return this.svc.findClient(u.tenantId, id); }
    updateClient(u, id, dto) { return this.svc.updateClient(u.tenantId, id, dto); }
    removeClient(u, id) { return this.svc.removeClient(u.tenantId, id); }
    getPipeline(u) { return this.svc.getPipelineSummary(u.tenantId); }
    findLeads(u, q) { return this.svc.findLeads(u.tenantId, q); }
    createLead(u, dto) { return this.svc.createLead(u.tenantId, u.sub, dto); }
    findLead(u, id) { return this.svc.findLead(u.tenantId, id); }
    updateLead(u, id, dto) { return this.svc.updateLead(u.tenantId, id, dto); }
    moveStage(u, id, dto) { return this.svc.moveLeadStage(u.tenantId, id, dto.stage); }
    removeLead(u, id) { return this.svc.removeLead(u.tenantId, id); }
    getAnalytics(u) { return this.svc.getAnalytics(u.tenantId); }
    findProposals(u) { return this.svc.findProposals(u.tenantId); }
    createProposal(u, dto) { return this.svc.createProposal(u.tenantId, u.sub, dto); }
    updateProposalStatus(u, id, dto) { return this.svc.updateProposalStatus(u.tenantId, id, dto.status); }
    findContracts(u) { return this.svc.findContracts(u.tenantId); }
    createContract(u, dto) { return this.svc.createContract(u.tenantId, u.sub, dto); }
    signContract(u, id) { return this.svc.signContract(u.tenantId, id); }
};
exports.CrmController = CrmController;
__decorate([
    (0, common_1.Get)('clients'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "findClients", null);
__decorate([
    (0, common_1.Post)('clients'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "createClient", null);
__decorate([
    (0, common_1.Get)('clients/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "findClient", null);
__decorate([
    (0, common_1.Patch)('clients/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "updateClient", null);
__decorate([
    (0, common_1.Delete)('clients/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "removeClient", null);
__decorate([
    (0, common_1.Get)('leads/pipeline'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "getPipeline", null);
__decorate([
    (0, common_1.Get)('leads'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "findLeads", null);
__decorate([
    (0, common_1.Post)('leads'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "createLead", null);
__decorate([
    (0, common_1.Get)('leads/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "findLead", null);
__decorate([
    (0, common_1.Patch)('leads/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "updateLead", null);
__decorate([
    (0, common_1.Patch)('leads/:id/stage'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "moveStage", null);
__decorate([
    (0, common_1.Delete)('leads/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "removeLead", null);
__decorate([
    (0, common_1.Get)('analytics'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('proposals'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "findProposals", null);
__decorate([
    (0, common_1.Post)('proposals'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "createProposal", null);
__decorate([
    (0, common_1.Patch)('proposals/:id/status'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "updateProposalStatus", null);
__decorate([
    (0, common_1.Get)('contracts'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "findContracts", null);
__decorate([
    (0, common_1.Post)('contracts'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "createContract", null);
__decorate([
    (0, common_1.Post)('contracts/:id/sign'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CrmController.prototype, "signContract", null);
exports.CrmController = CrmController = __decorate([
    (0, swagger_1.ApiTags)('CRM'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('crm'),
    __metadata("design:paramtypes", [crm_service_1.CrmService])
], CrmController);
//# sourceMappingURL=crm.controller.js.map