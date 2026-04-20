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
exports.Incident = exports.IncidentStatus = exports.IncidentSeverity = exports.IncidentType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var IncidentType;
(function (IncidentType) {
    IncidentType["ACCIDENT"] = "accident";
    IncidentType["NEAR_MISS"] = "near_miss";
    IncidentType["PROPERTY_DAMAGE"] = "property_damage";
})(IncidentType || (exports.IncidentType = IncidentType = {}));
var IncidentSeverity;
(function (IncidentSeverity) {
    IncidentSeverity["LOW"] = "low";
    IncidentSeverity["MEDIUM"] = "medium";
    IncidentSeverity["HIGH"] = "high";
    IncidentSeverity["CRITICAL"] = "critical";
})(IncidentSeverity || (exports.IncidentSeverity = IncidentSeverity = {}));
var IncidentStatus;
(function (IncidentStatus) {
    IncidentStatus["OPEN"] = "open";
    IncidentStatus["INVESTIGATING"] = "investigating";
    IncidentStatus["CLOSED"] = "closed";
})(IncidentStatus || (exports.IncidentStatus = IncidentStatus = {}));
let Incident = class Incident extends base_entity_1.TenantBaseEntity {
    projectId;
    incidentDate;
    type;
    severity;
    description;
    injuredPerson;
    rootCause;
    correctiveActions;
    photos;
    status;
};
exports.Incident = Incident;
__decorate([
    (0, typeorm_1.Column)({ name: 'project_id', type: 'uuid' }),
    __metadata("design:type", String)
], Incident.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'incident_date', type: 'date' }),
    __metadata("design:type", Date)
], Incident.prototype, "incidentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: IncidentType }),
    __metadata("design:type", String)
], Incident.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: IncidentSeverity }),
    __metadata("design:type", String)
], Incident.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Incident.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'injured_person', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Incident.prototype, "injuredPerson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'root_cause', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Incident.prototype, "rootCause", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'corrective_actions', type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], Incident.prototype, "correctiveActions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], Incident.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: IncidentStatus, default: IncidentStatus.OPEN }),
    __metadata("design:type", String)
], Incident.prototype, "status", void 0);
exports.Incident = Incident = __decorate([
    (0, typeorm_1.Entity)('safety_incidents')
], Incident);
//# sourceMappingURL=incident.entity.js.map