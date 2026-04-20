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
exports.Lead = exports.LeadStage = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var LeadStage;
(function (LeadStage) {
    LeadStage["NEW"] = "new";
    LeadStage["QUALIFIED"] = "qualified";
    LeadStage["PROPOSAL"] = "proposal";
    LeadStage["NEGOTIATION"] = "negotiation";
    LeadStage["WON"] = "won";
    LeadStage["LOST"] = "lost";
})(LeadStage || (exports.LeadStage = LeadStage = {}));
let Lead = class Lead extends base_entity_1.TenantBaseEntity {
    name;
    contactInfo;
    source;
    assignedTo;
    stage;
    expectedValue;
    expectedCloseDate;
    notes;
};
exports.Lead = Lead;
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Lead.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '{}' }),
    __metadata("design:type", Object)
], Lead.prototype, "contactInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_to', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: LeadStage, default: LeadStage.NEW }),
    __metadata("design:type", String)
], Lead.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_value', type: 'numeric', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Lead.prototype, "expectedValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_close_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "expectedCloseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Lead.prototype, "notes", void 0);
exports.Lead = Lead = __decorate([
    (0, typeorm_1.Entity)('leads')
], Lead);
//# sourceMappingURL=lead.entity.js.map