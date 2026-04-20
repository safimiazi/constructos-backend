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
exports.Project = exports.ProjectType = exports.ProjectStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PLANNING"] = "planning";
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["ON_HOLD"] = "on_hold";
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["CANCELLED"] = "cancelled";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
var ProjectType;
(function (ProjectType) {
    ProjectType["RESIDENTIAL"] = "residential";
    ProjectType["COMMERCIAL"] = "commercial";
    ProjectType["INDUSTRIAL"] = "industrial";
    ProjectType["INFRASTRUCTURE"] = "infrastructure";
    ProjectType["RENOVATION"] = "renovation";
})(ProjectType || (exports.ProjectType = ProjectType = {}));
let Project = class Project extends base_entity_1.TenantBaseEntity {
    name;
    type;
    description;
    clientId;
    location;
    budgetAmount;
    startDate;
    endDate;
    status;
    projectManagerId;
    completionPercentage;
    contractNumber;
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ProjectType }),
    __metadata("design:type", String)
], Project.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'budget_amount', type: 'numeric', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "budgetAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.PLANNING }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_manager_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "projectManagerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completion_percentage', type: 'numeric', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "completionPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_number', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], Project.prototype, "contractNumber", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects')
], Project);
//# sourceMappingURL=project.entity.js.map