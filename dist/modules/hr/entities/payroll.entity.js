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
exports.PayrollItem = exports.PayrollRun = exports.PayrollStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var PayrollStatus;
(function (PayrollStatus) {
    PayrollStatus["DRAFT"] = "draft";
    PayrollStatus["APPROVED"] = "approved";
    PayrollStatus["PAID"] = "paid";
})(PayrollStatus || (exports.PayrollStatus = PayrollStatus = {}));
let PayrollRun = class PayrollRun extends base_entity_1.TenantBaseEntity {
    payPeriod;
    totalEmployees;
    totalNetPay;
    status;
    payDate;
    approvedBy;
};
exports.PayrollRun = PayrollRun;
__decorate([
    (0, typeorm_1.Column)({ name: 'pay_period', length: 7 }),
    __metadata("design:type", String)
], PayrollRun.prototype, "payPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_employees', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PayrollRun.prototype, "totalEmployees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_net_pay', type: 'numeric', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollRun.prototype, "totalNetPay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PayrollStatus, default: PayrollStatus.DRAFT }),
    __metadata("design:type", String)
], PayrollRun.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pay_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], PayrollRun.prototype, "payDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PayrollRun.prototype, "approvedBy", void 0);
exports.PayrollRun = PayrollRun = __decorate([
    (0, typeorm_1.Entity)('payroll_runs')
], PayrollRun);
let PayrollItem = class PayrollItem extends base_entity_1.TenantBaseEntity {
    runId;
    employeeId;
    basicSalary;
    overtimePay;
    bonuses;
    deductions;
    totalBonuses;
    totalDeductions;
    netPay;
};
exports.PayrollItem = PayrollItem;
__decorate([
    (0, typeorm_1.Column)({ name: 'run_id', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollItem.prototype, "runId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollItem.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'basic_salary', type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], PayrollItem.prototype, "basicSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'overtime_pay', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollItem.prototype, "overtimePay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], PayrollItem.prototype, "bonuses", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], PayrollItem.prototype, "deductions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_bonuses', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollItem.prototype, "totalBonuses", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_deductions', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollItem.prototype, "totalDeductions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'net_pay', type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], PayrollItem.prototype, "netPay", void 0);
exports.PayrollItem = PayrollItem = __decorate([
    (0, typeorm_1.Entity)('payroll_items')
], PayrollItem);
//# sourceMappingURL=payroll.entity.js.map