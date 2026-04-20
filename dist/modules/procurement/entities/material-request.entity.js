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
exports.MaterialRequest = exports.MRStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var MRStatus;
(function (MRStatus) {
    MRStatus["PENDING"] = "pending";
    MRStatus["APPROVED"] = "approved";
    MRStatus["ORDERED"] = "ordered";
    MRStatus["REJECTED"] = "rejected";
})(MRStatus || (exports.MRStatus = MRStatus = {}));
let MaterialRequest = class MaterialRequest extends base_entity_1.TenantBaseEntity {
    projectId;
    taskId;
    status;
    items;
    notes;
    neededBy;
    approvedBy;
};
exports.MaterialRequest = MaterialRequest;
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], MaterialRequest.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], MaterialRequest.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MRStatus, default: MRStatus.PENDING }),
    __metadata("design:type", String)
], MaterialRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], MaterialRequest.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], MaterialRequest.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'needed_by', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], MaterialRequest.prototype, "neededBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], MaterialRequest.prototype, "approvedBy", void 0);
exports.MaterialRequest = MaterialRequest = __decorate([
    (0, typeorm_1.Entity)('material_requests')
], MaterialRequest);
//# sourceMappingURL=material-request.entity.js.map