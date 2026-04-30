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
exports.ThreeWayMatch = exports.MatchStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["PENDING"] = "pending";
    MatchStatus["MATCHED"] = "matched";
    MatchStatus["DISCREPANCY"] = "discrepancy";
})(MatchStatus || (exports.MatchStatus = MatchStatus = {}));
let ThreeWayMatch = class ThreeWayMatch extends base_entity_1.TenantBaseEntity {
    poId;
    grnId;
    invoiceId;
    status;
    poAmount;
    grnAmount;
    invoiceAmount;
    discrepancyNotes;
};
exports.ThreeWayMatch = ThreeWayMatch;
__decorate([
    (0, typeorm_1.Column)({ name: 'po_id', type: 'uuid' }),
    __metadata("design:type", String)
], ThreeWayMatch.prototype, "poId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grn_id', type: 'uuid' }),
    __metadata("design:type", String)
], ThreeWayMatch.prototype, "grnId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_id', type: 'uuid' }),
    __metadata("design:type", String)
], ThreeWayMatch.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MatchStatus, default: MatchStatus.PENDING }),
    __metadata("design:type", String)
], ThreeWayMatch.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'po_amount', type: 'numeric', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ThreeWayMatch.prototype, "poAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grn_amount', type: 'numeric', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ThreeWayMatch.prototype, "grnAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_amount', type: 'numeric', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ThreeWayMatch.prototype, "invoiceAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discrepancy_notes', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ThreeWayMatch.prototype, "discrepancyNotes", void 0);
exports.ThreeWayMatch = ThreeWayMatch = __decorate([
    (0, typeorm_1.Entity)('three_way_matches')
], ThreeWayMatch);
//# sourceMappingURL=three-way-match.entity.js.map