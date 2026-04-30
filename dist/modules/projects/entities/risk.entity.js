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
exports.Risk = exports.RiskLevel = exports.RiskStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var RiskStatus;
(function (RiskStatus) {
    RiskStatus["OPEN"] = "open";
    RiskStatus["MITIGATED"] = "mitigated";
    RiskStatus["CLOSED"] = "closed";
})(RiskStatus || (exports.RiskStatus = RiskStatus = {}));
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "low";
    RiskLevel["MEDIUM"] = "medium";
    RiskLevel["HIGH"] = "high";
    RiskLevel["CRITICAL"] = "critical";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
let Risk = class Risk extends base_entity_1.TenantBaseEntity {
    projectId;
    title;
    description;
    likelihood;
    impact;
    status;
    mitigationPlan;
    ownerId;
};
exports.Risk = Risk;
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], Risk.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], Risk.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Risk.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RiskLevel, name: 'likelihood' }),
    __metadata("design:type", String)
], Risk.prototype, "likelihood", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RiskLevel }),
    __metadata("design:type", String)
], Risk.prototype, "impact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RiskStatus, default: RiskStatus.OPEN }),
    __metadata("design:type", String)
], Risk.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mitigation_plan', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Risk.prototype, "mitigationPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'owner_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Risk.prototype, "ownerId", void 0);
exports.Risk = Risk = __decorate([
    (0, typeorm_1.Entity)('risks')
], Risk);
//# sourceMappingURL=risk.entity.js.map