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
exports.Contract = exports.Proposal = exports.ContractStatus = exports.ProposalStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus["DRAFT"] = "draft";
    ProposalStatus["SENT"] = "sent";
    ProposalStatus["ACCEPTED"] = "accepted";
    ProposalStatus["REJECTED"] = "rejected";
})(ProposalStatus || (exports.ProposalStatus = ProposalStatus = {}));
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["DRAFT"] = "draft";
    ContractStatus["ACTIVE"] = "active";
    ContractStatus["COMPLETED"] = "completed";
    ContractStatus["TERMINATED"] = "terminated";
})(ContractStatus || (exports.ContractStatus = ContractStatus = {}));
let Proposal = class Proposal extends base_entity_1.TenantBaseEntity {
    leadId;
    clientId;
    title;
    items;
    totalValue;
    status;
    validUntil;
    notes;
};
exports.Proposal = Proposal;
__decorate([
    (0, typeorm_1.Column)({ name: 'lead_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Proposal.prototype, "leadId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Proposal.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], Proposal.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], Proposal.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_value', type: 'numeric', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Proposal.prototype, "totalValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ProposalStatus, default: ProposalStatus.DRAFT }),
    __metadata("design:type", String)
], Proposal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_until', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Proposal.prototype, "validUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Proposal.prototype, "notes", void 0);
exports.Proposal = Proposal = __decorate([
    (0, typeorm_1.Entity)('proposals')
], Proposal);
let Contract = class Contract extends base_entity_1.TenantBaseEntity {
    clientId;
    projectId;
    proposalId;
    title;
    value;
    startDate;
    endDate;
    status;
    signedDocUrl;
    eSignedAt;
};
exports.Contract = Contract;
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'uuid' }),
    __metadata("design:type", String)
], Contract.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Contract.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proposal_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Contract.prototype, "proposalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], Contract.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Contract.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Contract.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Contract.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ContractStatus, default: ContractStatus.DRAFT }),
    __metadata("design:type", String)
], Contract.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_doc_url', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Contract.prototype, "signedDocUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'e_signed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Contract.prototype, "eSignedAt", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_1.Entity)('contracts')
], Contract);
//# sourceMappingURL=proposal.entity.js.map