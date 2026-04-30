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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseClaim = exports.TaxRate = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
let TaxRate = class TaxRate extends base_entity_1.TenantBaseEntity {
    name;
    rate;
    type;
    isActive;
    description;
};
exports.TaxRate = TaxRate;
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], TaxRate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], TaxRate.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'VAT' }),
    __metadata("design:type", String)
], TaxRate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], TaxRate.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], TaxRate.prototype, "description", void 0);
exports.TaxRate = TaxRate = __decorate([
    (0, typeorm_1.Entity)('tax_rates')
], TaxRate);
let ExpenseClaim = class ExpenseClaim extends base_entity_1.TenantBaseEntity {
    employeeId;
    title;
    amount;
    date;
    category;
    projectId;
    receiptUrl;
    status;
    approvedBy;
    notes;
};
exports.ExpenseClaim = ExpenseClaim;
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], ExpenseClaim.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], ExpenseClaim.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], ExpenseClaim.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ExpenseClaim.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], ExpenseClaim.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], ExpenseClaim.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receipt_url', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], ExpenseClaim.prototype, "receiptUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'pending' }),
    __metadata("design:type", String)
], ExpenseClaim.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], ExpenseClaim.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ExpenseClaim.prototype, "notes", void 0);
exports.ExpenseClaim = ExpenseClaim = __decorate([
    (0, typeorm_1.Entity)('expense_claims')
], ExpenseClaim);
//# sourceMappingURL=tax.entity.js.map