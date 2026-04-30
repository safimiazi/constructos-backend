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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const projects_service_1 = require("./projects.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let ProjectsController = class ProjectsController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    getDashboard(u) { return this.svc.getDashboard(u.tenantId); }
    findAll(u, q) { return this.svc.findAll(u.tenantId, q); }
    create(u, dto) { return this.svc.create(u.tenantId, u.sub, dto); }
    findOne(u, id) { return this.svc.findOne(u.tenantId, id); }
    update(u, id, dto) { return this.svc.update(u.tenantId, id, dto); }
    remove(u, id) { return this.svc.remove(u.tenantId, id); }
    getTasks(u, id) { return this.svc.getTasks(u.tenantId, id); }
    createTask(u, id, dto) { return this.svc.createTask(u.tenantId, id, u.sub, dto); }
    updateTask(u, taskId, dto) { return this.svc.updateTask(u.tenantId, taskId, dto); }
    removeTask(u, taskId) { return this.svc.removeTask(u.tenantId, taskId); }
    getDeps(u, taskId) { return this.svc.getTaskDependencies(u.tenantId, taskId); }
    createDep(u, taskId, dto) { return this.svc.createDependency(u.tenantId, u.sub, { ...dto, taskId }); }
    removeDep(u, depId) { return this.svc.removeDependency(u.tenantId, depId); }
    getGantt(u, id) { return this.svc.getGanttData(u.tenantId, id); }
    getLogs(u, id) { return this.svc.getLogs(u.tenantId, id); }
    createLog(u, id, dto) { return this.svc.createLog(u.tenantId, id, u.sub, dto); }
    getMilestones(u, id) { return this.svc.getMilestones(u.tenantId, id); }
    createMilestone(u, id, dto) { return this.svc.createMilestone(u.tenantId, id, u.sub, dto); }
    updateMilestone(u, mid, dto) { return this.svc.updateMilestone(u.tenantId, mid, dto); }
    removeMilestone(u, mid) { return this.svc.removeMilestone(u.tenantId, mid); }
    getIssues(u, id, q) { return this.svc.getIssues(u.tenantId, id, q); }
    createIssue(u, id, dto) { return this.svc.createIssue(u.tenantId, id, u.sub, dto); }
    updateIssue(u, iid, dto) { return this.svc.updateIssue(u.tenantId, iid, dto); }
    getSubs(u, id) { return this.svc.getSubcontracts(u.tenantId, id); }
    createSub(u, id, dto) { return this.svc.createSubcontract(u.tenantId, u.sub, { ...dto, projectId: id }); }
    updateSub(u, sid, dto) { return this.svc.updateSubcontract(u.tenantId, sid, dto); }
    getRisks(u, id) { return this.svc.getRisks(u.tenantId, id); }
    createRisk(u, id, dto) { return this.svc.createRisk(u.tenantId, u.sub, { ...dto, projectId: id }); }
    updateRisk(u, rid, dto) { return this.svc.updateRisk(u.tenantId, rid, dto); }
    getDefects(u, id, q) { return this.svc.getDefects(u.tenantId, id, q); }
    createDefect(u, id, dto) { return this.svc.createDefect(u.tenantId, id, u.sub, dto); }
    updateDefect(u, did, dto) { return this.svc.updateDefect(u.tenantId, did, dto); }
    removeDefect(u, did) { return this.svc.removeDefect(u.tenantId, did); }
    getCostReport(u, id) { return this.svc.getProjectCostReport(u.tenantId, id); }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/tasks'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Post)(':id/tasks'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createTask", null);
__decorate([
    (0, common_1.Patch)(':id/tasks/:taskId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(':id/tasks/:taskId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeTask", null);
__decorate([
    (0, common_1.Get)(':id/tasks/:taskId/dependencies'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getDeps", null);
__decorate([
    (0, common_1.Post)(':id/tasks/:taskId/dependencies'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createDep", null);
__decorate([
    (0, common_1.Delete)(':id/tasks/:taskId/dependencies/:depId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('depId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeDep", null);
__decorate([
    (0, common_1.Get)(':id/gantt'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getGantt", null);
__decorate([
    (0, common_1.Get)(':id/daily-logs'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Post)(':id/daily-logs'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createLog", null);
__decorate([
    (0, common_1.Get)(':id/milestones'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getMilestones", null);
__decorate([
    (0, common_1.Post)(':id/milestones'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createMilestone", null);
__decorate([
    (0, common_1.Patch)(':id/milestones/:mid'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('mid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateMilestone", null);
__decorate([
    (0, common_1.Delete)(':id/milestones/:mid'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('mid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeMilestone", null);
__decorate([
    (0, common_1.Get)(':id/issues'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getIssues", null);
__decorate([
    (0, common_1.Post)(':id/issues'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createIssue", null);
__decorate([
    (0, common_1.Patch)(':id/issues/:iid'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('iid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateIssue", null);
__decorate([
    (0, common_1.Get)(':id/subcontracts'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getSubs", null);
__decorate([
    (0, common_1.Post)(':id/subcontracts'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createSub", null);
__decorate([
    (0, common_1.Patch)(':id/subcontracts/:sid'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('sid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateSub", null);
__decorate([
    (0, common_1.Get)(':id/risks'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getRisks", null);
__decorate([
    (0, common_1.Post)(':id/risks'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createRisk", null);
__decorate([
    (0, common_1.Patch)(':id/risks/:rid'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('rid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateRisk", null);
__decorate([
    (0, common_1.Get)(':id/defects'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getDefects", null);
__decorate([
    (0, common_1.Post)(':id/defects'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createDefect", null);
__decorate([
    (0, common_1.Patch)(':id/defects/:did'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('did')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateDefect", null);
__decorate([
    (0, common_1.Delete)(':id/defects/:did'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('did')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeDefect", null);
__decorate([
    (0, common_1.Get)(':id/cost-report'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getCostReport", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map