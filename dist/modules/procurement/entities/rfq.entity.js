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
exports.GRN = exports.RFQ = exports.RFQStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var RFQStatus;
(function (RFQStatus) {
    RFQStatus["DRAFT"] = "draft";
    RFQStatus["SENT"] = "sent";
    RFQStatus["AWARDED"] = "awarded";
    RFQStatus["CANCELLED"] = "cancelled";
})(RFQStatus || (exports.RFQStatus = RFQStatus = {}));
let RFQ = class RFQ extends base_entity_1.TenantBaseEntity {
    rfqNumber;
    projectId;
    items;
    vendorIds;
    awardedVendorId;
    status;
    deadline;
    notes;
};
exports.RFQ = RFQ;
__decorate([
    (0, typeorm_1.Column)({ name: 'rfq_number', length: 50 }),
    __metadata("design:type", String)
], RFQ.prototype, "rfqNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], RFQ.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], RFQ.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_ids', type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], RFQ.prototype, "vendorIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'awarded_vendor_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], RFQ.prototype, "awardedVendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RFQStatus, default: RFQStatus.DRAFT }),
    __metadata("design:type", String)
], RFQ.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deadline', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], RFQ.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RFQ.prototype, "notes", void 0);
exports.RFQ = RFQ = __decorate([
    (0, typeorm_1.Entity)('rfqs')
], RFQ);
let GRN = class GRN extends base_entity_1.TenantBaseEntity {
    poId;
    receivedAt;
    status;
    items;
    notes;
};
exports.GRN = GRN;
__decorate([
    (0, typeorm_1.Column)({ name: 'po_id', type: 'uuid' }),
    __metadata("design:type", String)
], GRN.prototype, "poId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], GRN.prototype, "receivedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], GRN.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], GRN.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], GRN.prototype, "notes", void 0);
exports.GRN = GRN = __decorate([
    (0, typeorm_1.Entity)('grn')
], GRN);
//# sourceMappingURL=rfq.entity.js.map