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
exports.Inventory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
let Inventory = class Inventory extends base_entity_1.TenantBaseEntity {
    materialName;
    unit;
    qtyInHand;
    reorderLevel;
    location;
    unitCost;
};
exports.Inventory = Inventory;
__decorate([
    (0, typeorm_1.Column)({ name: 'material_name', length: 200 }),
    __metadata("design:type", String)
], Inventory.prototype, "materialName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Inventory.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qty_in_hand', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "qtyInHand", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reorder_level', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "reorderLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_cost', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "unitCost", void 0);
exports.Inventory = Inventory = __decorate([
    (0, typeorm_1.Entity)('inventory')
], Inventory);
//# sourceMappingURL=inventory.entity.js.map