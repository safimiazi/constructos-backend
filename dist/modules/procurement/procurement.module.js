"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcurementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vendor_entity_1 = require("./entities/vendor.entity");
const purchase_order_entity_1 = require("./entities/purchase-order.entity");
const material_request_entity_1 = require("./entities/material-request.entity");
const inventory_entity_1 = require("./entities/inventory.entity");
const rfq_entity_1 = require("./entities/rfq.entity");
const three_way_match_entity_1 = require("./entities/three-way-match.entity");
const procurement_service_1 = require("./procurement.service");
const procurement_controller_1 = require("./procurement.controller");
let ProcurementModule = class ProcurementModule {
};
exports.ProcurementModule = ProcurementModule;
exports.ProcurementModule = ProcurementModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vendor_entity_1.Vendor, purchase_order_entity_1.PurchaseOrder, material_request_entity_1.MaterialRequest, inventory_entity_1.Inventory, rfq_entity_1.RFQ, rfq_entity_1.GRN, three_way_match_entity_1.ThreeWayMatch])],
        controllers: [procurement_controller_1.ProcurementController],
        providers: [procurement_service_1.ProcurementService],
        exports: [procurement_service_1.ProcurementService],
    })
], ProcurementModule);
//# sourceMappingURL=procurement.module.js.map