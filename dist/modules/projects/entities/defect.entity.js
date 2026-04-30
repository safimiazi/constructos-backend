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
exports.Defect = exports.DefectSeverity = exports.DefectStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var DefectStatus;
(function (DefectStatus) {
    DefectStatus["OPEN"] = "open";
    DefectStatus["IN_PROGRESS"] = "in_progress";
    DefectStatus["RESOLVED"] = "resolved";
    DefectStatus["CLOSED"] = "closed";
})(DefectStatus || (exports.DefectStatus = DefectStatus = {}));
var DefectSeverity;
(function (DefectSeverity) {
    DefectSeverity["LOW"] = "low";
    DefectSeverity["MEDIUM"] = "medium";
    DefectSeverity["HIGH"] = "high";
    DefectSeverity["CRITICAL"] = "critical";
})(DefectSeverity || (exports.DefectSeverity = DefectSeverity = {}));
let Defect = class Defect extends base_entity_1.TenantBaseEntity {
    projectId;
    title;
    description;
    location;
    severity;
    status;
    assignedTo;
    dueDate;
    resolvedAt;
};
exports.Defect = Defect;
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], Defect.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300 }),
    __metadata("design:type", String)
], Defect.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Defect.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Defect.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DefectSeverity, default: DefectSeverity.MEDIUM }),
    __metadata("design:type", String)
], Defect.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DefectStatus, default: DefectStatus.OPEN }),
    __metadata("design:type", String)
], Defect.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_to', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Defect.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Defect.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resolved_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Defect.prototype, "resolvedAt", void 0);
exports.Defect = Defect = __decorate([
    (0, typeorm_1.Entity)('defects')
], Defect);
//# sourceMappingURL=defect.entity.js.map