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
exports.PurchaseOrder = exports.POStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var POStatus;
(function (POStatus) {
    POStatus["DRAFT"] = "draft";
    POStatus["SENT"] = "sent";
    POStatus["APPROVED"] = "approved";
    POStatus["RECEIVED"] = "received";
    POStatus["CANCELLED"] = "cancelled";
})(POStatus || (exports.POStatus = POStatus = {}));
let PurchaseOrder = class PurchaseOrder extends base_entity_1.TenantBaseEntity {
    poNumber;
    vendorId;
    projectId;
    items;
    totalCost;
    status;
    expectedDate;
    receivedDate;
    notes;
};
exports.PurchaseOrder = PurchaseOrder;
__decorate([
    (0, typeorm_1.Column)({ name: 'po_number', length: 50 }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "poNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id', type: 'uuid' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], PurchaseOrder.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_cost', type: 'numeric', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "totalCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: POStatus, default: POStatus.DRAFT }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "expectedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "receivedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "notes", void 0);
exports.PurchaseOrder = PurchaseOrder = __decorate([
    (0, typeorm_1.Entity)('purchase_orders')
], PurchaseOrder);
//# sourceMappingURL=purchase-order.entity.js.map