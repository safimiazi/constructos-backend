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
exports.TaskDependency = exports.DependencyType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/base.entity");
var DependencyType;
(function (DependencyType) {
    DependencyType["FS"] = "FS";
    DependencyType["SS"] = "SS";
    DependencyType["FF"] = "FF";
    DependencyType["SF"] = "SF";
})(DependencyType || (exports.DependencyType = DependencyType = {}));
let TaskDependency = class TaskDependency extends base_entity_1.TenantBaseEntity {
    taskId;
    dependsOnTaskId;
    type;
    lagDays;
};
exports.TaskDependency = TaskDependency;
__decorate([
    (0, typeorm_1.Column)({ name: 'task_id', type: 'uuid' }),
    __metadata("design:type", String)
], TaskDependency.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'depends_on_task_id', type: 'uuid' }),
    __metadata("design:type", String)
], TaskDependency.prototype, "dependsOnTaskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DependencyType, default: DependencyType.FS }),
    __metadata("design:type", String)
], TaskDependency.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lag_days', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], TaskDependency.prototype, "lagDays", void 0);
exports.TaskDependency = TaskDependency = __decorate([
    (0, typeorm_1.Entity)('task_dependencies')
], TaskDependency);
//# sourceMappingURL=task-dependency.entity.js.map