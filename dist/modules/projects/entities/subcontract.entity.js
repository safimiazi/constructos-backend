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
exports.Subcontract = exports.SubcontractStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var SubcontractStatus;
(function (SubcontractStatus) {
    SubcontractStatus["DRAFT"] = "draft";
    SubcontractStatus["ACTIVE"] = "active";
    SubcontractStatus["COMPLETED"] = "completed";
    SubcontractStatus["TERMINATED"] = "terminated";
})(SubcontractStatus || (exports.SubcontractStatus = SubcontractStatus = {}));
let Subcontract = class Subcontract extends base_entity_1.TenantBaseEntity {
    projectId;
    vendorId;
    subcontractorName;
    scope;
    contractValue;
    startDate;
    endDate;
    status;
    completionPct;
    notes;
};
exports.Subcontract = Subcontract;
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], Subcontract.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Subcontract.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subcontractor_name', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], Subcontract.prototype, "subcontractorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Subcontract.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_value', type: 'numeric', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Subcontract.prototype, "contractValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Subcontract.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Subcontract.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SubcontractStatus, default: SubcontractStatus.DRAFT }),
    __metadata("design:type", String)
], Subcontract.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completion_pct', type: 'numeric', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Subcontract.prototype, "completionPct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Subcontract.prototype, "notes", void 0);
exports.Subcontract = Subcontract = __decorate([
    (0, typeorm_1.Entity)('subcontracts')
], Subcontract);
//# sourceMappingURL=subcontract.entity.js.map