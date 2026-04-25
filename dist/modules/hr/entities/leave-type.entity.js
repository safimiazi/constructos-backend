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
exports.LeaveType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
let LeaveType = class LeaveType extends base_entity_1.TenantBaseEntity {
    name;
    annualEntitlement;
    isPaid;
    carryForward;
    isActive;
};
exports.LeaveType = LeaveType;
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], LeaveType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'annual_entitlement', type: 'numeric', precision: 5, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], LeaveType.prototype, "annualEntitlement", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_paid', default: true }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'carry_forward', default: false }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "carryForward", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "isActive", void 0);
exports.LeaveType = LeaveType = __decorate([
    (0, typeorm_1.Entity)('leave_types')
], LeaveType);
//# sourceMappingURL=leave-type.entity.js.map