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
exports.BankTransaction = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
let BankTransaction = class BankTransaction extends base_entity_1.TenantBaseEntity {
    bankAccountId;
    date;
    description;
    amount;
    type;
    reconciled;
    reference;
    matchedInvoiceId;
};
exports.BankTransaction = BankTransaction;
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account_id', type: 'uuid' }),
    __metadata("design:type", String)
], BankTransaction.prototype, "bankAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], BankTransaction.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BankTransaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], BankTransaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], BankTransaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BankTransaction.prototype, "reconciled", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reference', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], BankTransaction.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'matched_invoice_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], BankTransaction.prototype, "matchedInvoiceId", void 0);
exports.BankTransaction = BankTransaction = __decorate([
    (0, typeorm_1.Entity)('bank_transactions')
], BankTransaction);
//# sourceMappingURL=bank-transaction.entity.js.map