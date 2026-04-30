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
exports.SafetyChecklist = exports.PermitToWork = exports.PTWType = exports.PTWStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var PTWStatus;
(function (PTWStatus) {
    PTWStatus["PENDING"] = "pending";
    PTWStatus["ACTIVE"] = "active";
    PTWStatus["CLOSED"] = "closed";
    PTWStatus["CANCELLED"] = "cancelled";
})(PTWStatus || (exports.PTWStatus = PTWStatus = {}));
var PTWType;
(function (PTWType) {
    PTWType["HOT_WORK"] = "hot_work";
    PTWType["EXCAVATION"] = "excavation";
    PTWType["CONFINED_SPACE"] = "confined_space";
    PTWType["ELECTRICAL"] = "electrical";
    PTWType["WORKING_AT_HEIGHT"] = "working_at_height";
})(PTWType || (exports.PTWType = PTWType = {}));
let PermitToWork = class PermitToWork extends base_entity_1.TenantBaseEntity {
    projectId;
    permitType;
    issuedTo;
    validFrom;
    validUntil;
    conditions;
    status;
    issuedBy;
    notes;
};
exports.PermitToWork = PermitToWork;
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], PermitToWork.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PTWType }),
    __metadata("design:type", String)
], PermitToWork.prototype, "permitType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issued_to', type: 'varchar' }),
    __metadata("design:type", String)
], PermitToWork.prototype, "issuedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_from', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PermitToWork.prototype, "validFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_until', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PermitToWork.prototype, "validUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], PermitToWork.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PTWStatus, default: PTWStatus.PENDING }),
    __metadata("design:type", String)
], PermitToWork.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issued_by', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PermitToWork.prototype, "issuedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PermitToWork.prototype, "notes", void 0);
exports.PermitToWork = PermitToWork = __decorate([
    (0, typeorm_1.Entity)('permits_to_work')
], PermitToWork);
let SafetyChecklist = class SafetyChecklist extends base_entity_1.TenantBaseEntity {
    projectId;
    title;
    items;
    conductedBy;
    date;
    score;
    status;
};
exports.SafetyChecklist = SafetyChecklist;
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], SafetyChecklist.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], SafetyChecklist.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], SafetyChecklist.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conducted_by', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], SafetyChecklist.prototype, "conductedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], SafetyChecklist.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], SafetyChecklist.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'pending' }),
    __metadata("design:type", String)
], SafetyChecklist.prototype, "status", void 0);
exports.SafetyChecklist = SafetyChecklist = __decorate([
    (0, typeorm_1.Entity)('safety_checklists')
], SafetyChecklist);
//# sourceMappingURL=ptw.entity.js.map