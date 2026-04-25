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
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const finance_service_1 = require("./finance.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let FinanceController = class FinanceController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    findInvoices(u, q) { return this.svc.findInvoices(u.tenantId, q); }
    getStats(u) { return this.svc.getDashboardStats(u.tenantId); }
    createInvoice(u, dto) { return this.svc.createInvoice(u.tenantId, u.sub, dto); }
    findInvoice(u, id) { return this.svc.findInvoice(u.tenantId, id); }
    updateInvoice(u, id, dto) { return this.svc.updateInvoice(u.tenantId, id, dto); }
    updateStatus(u, id, dto) { return this.svc.updateStatus(u.tenantId, id, dto.status); }
    recordPayment(u, id, dto) { return this.svc.recordPayment(u.tenantId, id, u.sub, dto); }
    getPayments(u, id) { return this.svc.getInvoicePayments(u.tenantId, id); }
    removeInvoice(u, id) { return this.svc.removeInvoice(u.tenantId, id); }
    findCOA(u) { return this.svc.findCOA(u.tenantId); }
    createCOA(u, dto) { return this.svc.createCOA(u.tenantId, u.sub, dto); }
    findJournals(u, q) { return this.svc.findJournals(u.tenantId, q); }
    createJournal(u, dto) { return this.svc.createJournal(u.tenantId, u.sub, dto); }
    postJournal(u, id) { return this.svc.postJournal(u.tenantId, id); }
    findBudgets(u, pid) { return this.svc.findBudgets(u.tenantId, pid); }
    getBudgetSummary(u, pid) { return this.svc.getBudgetSummary(u.tenantId, pid); }
    createBudget(u, dto) { return this.svc.createBudget(u.tenantId, u.sub, dto); }
    updateBudget(u, id, dto) { return this.svc.updateBudget(u.tenantId, id, dto); }
    removeBudget(u, id) { return this.svc.removeBudget(u.tenantId, id); }
    findBankAccounts(u) { return this.svc.findBankAccounts(u.tenantId); }
    createBankAccount(u, dto) { return this.svc.createBankAccount(u.tenantId, u.sub, dto); }
    updateBankAccount(u, id, dto) { return this.svc.updateBankAccount(u.tenantId, id, dto); }
    getPL(u, sd, ed) { return this.svc.getPLReport(u.tenantId, sd, ed); }
    getCashflow(u) { return this.svc.getCashflowReport(u.tenantId); }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Get)('invoices'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findInvoices", null);
__decorate([
    (0, common_1.Get)('invoices/stats'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('invoices'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)('invoices/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findInvoice", null);
__decorate([
    (0, common_1.Patch)('invoices/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "updateInvoice", null);
__decorate([
    (0, common_1.Patch)('invoices/:id/status'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('invoices/:id/payments'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "recordPayment", null);
__decorate([
    (0, common_1.Get)('invoices/:id/payments'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getPayments", null);
__decorate([
    (0, common_1.Delete)('invoices/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "removeInvoice", null);
__decorate([
    (0, common_1.Get)('coa'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findCOA", null);
__decorate([
    (0, common_1.Post)('coa'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createCOA", null);
__decorate([
    (0, common_1.Get)('journal-entries'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findJournals", null);
__decorate([
    (0, common_1.Post)('journal-entries'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createJournal", null);
__decorate([
    (0, common_1.Post)('journal-entries/:id/post'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "postJournal", null);
__decorate([
    (0, common_1.Get)('budgets/:projectId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findBudgets", null);
__decorate([
    (0, common_1.Get)('budgets/:projectId/summary'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getBudgetSummary", null);
__decorate([
    (0, common_1.Post)('budgets'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createBudget", null);
__decorate([
    (0, common_1.Patch)('budgets/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "updateBudget", null);
__decorate([
    (0, common_1.Delete)('budgets/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "removeBudget", null);
__decorate([
    (0, common_1.Get)('bank-accounts'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findBankAccounts", null);
__decorate([
    (0, common_1.Post)('bank-accounts'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createBankAccount", null);
__decorate([
    (0, common_1.Patch)('bank-accounts/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "updateBankAccount", null);
__decorate([
    (0, common_1.Get)('reports/pl'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getPL", null);
__decorate([
    (0, common_1.Get)('reports/cashflow'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getCashflow", null);
exports.FinanceController = FinanceController = __decorate([
    (0, swagger_1.ApiTags)('Finance'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('finance'),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map