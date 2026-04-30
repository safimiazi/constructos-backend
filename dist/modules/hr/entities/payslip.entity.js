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
exports.Payslip = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
let Payslip = class Payslip extends base_entity_1.TenantBaseEntity {
    payrollItemId;
    employeeId;
    payPeriod;
    pdfUrl;
    sentAt;
    basicSalary;
    overtimePay;
    bonuses;
    deductions;
    netPay;
};
exports.Payslip = Payslip;
__decorate([
    (0, typeorm_1.Column)({ name: 'payroll_item_id', type: 'uuid' }),
    __metadata("design:type", String)
], Payslip.prototype, "payrollItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], Payslip.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pay_period', length: 7 }),
    __metadata("design:type", String)
], Payslip.prototype, "payPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pdf_url', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Payslip.prototype, "pdfUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sent_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Payslip.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'basic_salary', type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Payslip.prototype, "basicSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'overtime_pay', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payslip.prototype, "overtimePay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], Payslip.prototype, "bonuses", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], Payslip.prototype, "deductions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'net_pay', type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Payslip.prototype, "netPay", void 0);
exports.Payslip = Payslip = __decorate([
    (0, typeorm_1.Entity)('payslips')
], Payslip);
//# sourceMappingURL=payslip.entity.js.map