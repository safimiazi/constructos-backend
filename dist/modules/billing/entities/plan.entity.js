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
exports.Plan = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
const jwt_payload_interface_1 = require("../../../common/interfaces/jwt-payload.interface");
let Plan = class Plan extends base_entity_1.BaseEntity {
    name;
    tier;
    priceMonthly;
    priceAnnual;
    maxUsers;
    maxProjects;
    storageGb;
    features;
    isActive;
};
exports.Plan = Plan;
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Plan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: jwt_payload_interface_1.PlanTier }),
    __metadata("design:type", String)
], Plan.prototype, "tier", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price_monthly', type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Plan.prototype, "priceMonthly", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price_annual', type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Plan.prototype, "priceAnnual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_users', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Plan.prototype, "maxUsers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_projects', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Plan.prototype, "maxProjects", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'storage_gb', type: 'int' }),
    __metadata("design:type", Number)
], Plan.prototype, "storageGb", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '{}' }),
    __metadata("design:type", Object)
], Plan.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plan.prototype, "isActive", void 0);
exports.Plan = Plan = __decorate([
    (0, typeorm_1.Entity)('plans')
], Plan);
//# sourceMappingURL=plan.entity.js.map