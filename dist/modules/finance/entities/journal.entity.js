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
exports.InvoicePayment = exports.JournalEntry = exports.ChartOfAccount = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
let ChartOfAccount = class ChartOfAccount extends base_entity_1.TenantBaseEntity {
    code;
    name;
    type;
    parentId;
    isActive;
};
exports.ChartOfAccount = ChartOfAccount;
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], ChartOfAccount.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], ChartOfAccount.prototype, "isActive", void 0);
exports.ChartOfAccount = ChartOfAccount = __decorate([
    (0, typeorm_1.Entity)('chart_of_accounts')
], ChartOfAccount);
let JournalEntry = class JournalEntry extends base_entity_1.TenantBaseEntity {
    entryDate;
    reference;
    description;
    isPosted;
    lines;
};
exports.JournalEntry = JournalEntry;
__decorate([
    (0, typeorm_1.Column)({ name: 'entry_date', type: 'date' }),
    __metadata("design:type", Date)
], JournalEntry.prototype, "entryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], JournalEntry.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], JournalEntry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_posted', default: false }),
    __metadata("design:type", Boolean)
], JournalEntry.prototype, "isPosted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], JournalEntry.prototype, "lines", void 0);
exports.JournalEntry = JournalEntry = __decorate([
    (0, typeorm_1.Entity)('journal_entries')
], JournalEntry);
let InvoicePayment = class InvoicePayment extends base_entity_1.TenantBaseEntity {
    invoiceId;
    amount;
    paidAt;
    method;
    reference;
    notes;
};
exports.InvoicePayment = InvoicePayment;
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_id', type: 'uuid' }),
    __metadata("design:type", String)
], InvoicePayment.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], InvoicePayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], InvoicePayment.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], InvoicePayment.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], InvoicePayment.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], InvoicePayment.prototype, "notes", void 0);
exports.InvoicePayment = InvoicePayment = __decorate([
    (0, typeorm_1.Entity)('invoice_payments')
], InvoicePayment);
//# sourceMappingURL=journal.entity.js.map