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
exports.HrController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hr_service_1 = require("./hr.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let HrController = class HrController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    findEmployees(u, q) {
        return this.svc.findEmployees(u.tenantId, q);
    }
    createEmployee(u, dto) {
        return this.svc.createEmployee(u.tenantId, u.sub, dto);
    }
    findEmployee(u, id) {
        return this.svc.findEmployee(u.tenantId, id);
    }
    updateEmployee(u, id, dto) {
        return this.svc.updateEmployee(u.tenantId, id, dto);
    }
    removeEmployee(u, id) {
        return this.svc.removeEmployee(u.tenantId, id);
    }
    findDepts(u) {
        return this.svc.findDepartments(u.tenantId);
    }
    createDept(u, dto) {
        return this.svc.createDepartment(u.tenantId, u.sub, dto);
    }
    updateDept(u, id, dto) {
        return this.svc.updateDepartment(u.tenantId, id, dto);
    }
    removeDept(u, id) {
        return this.svc.removeDepartment(u.tenantId, id);
    }
    findAttendance(u, q) {
        return this.svc.findAttendance(u.tenantId, q);
    }
    getAttSummary(u, month) {
        return this.svc.getAttendanceSummary(u.tenantId, month);
    }
    createAttendance(u, dto) {
        return this.svc.createAttendance(u.tenantId, u.sub, dto);
    }
    clockIn(u, dto) {
        return this.svc.clockIn(u.tenantId, dto.employeeId, u.sub, dto.location);
    }
    clockOut(u, dto) {
        return this.svc.clockOut(u.tenantId, dto.employeeId, dto.location);
    }
    updateAttendance(u, id, dto) {
        return this.svc.updateAttendance(u.tenantId, id, dto);
    }
    findLeaveTypes(u) {
        return this.svc.findLeaveTypes(u.tenantId);
    }
    createLeaveType(u, dto) {
        return this.svc.createLeaveType(u.tenantId, u.sub, dto);
    }
    updateLeaveType(u, id, dto) {
        return this.svc.updateLeaveType(u.tenantId, id, dto);
    }
    findLeaves(u, q) {
        return this.svc.findLeaves(u.tenantId, q);
    }
    createLeave(u, dto) {
        return this.svc.createLeave(u.tenantId, u.sub, dto);
    }
    approveLeave(u, id) {
        return this.svc.approveLeave(u.tenantId, id, u.sub);
    }
    rejectLeave(u, id, dto) {
        return this.svc.rejectLeave(u.tenantId, id, dto.reason);
    }
    findPayrollRuns(u) {
        return this.svc.findPayrollRuns(u.tenantId);
    }
    createPayrollRun(u, dto) {
        return this.svc.createPayrollRun(u.tenantId, u.sub, dto.payPeriod);
    }
    getPayrollItems(u, id) {
        return this.svc.getPayrollItems(u.tenantId, id);
    }
    updatePayrollItem(u, id, dto) {
        return this.svc.updatePayrollItem(u.tenantId, id, dto);
    }
    approvePayrollRun(u, id) {
        return this.svc.approvePayrollRun(u.tenantId, id, u.sub);
    }
    findJobs(u) {
        return this.svc.findJobs(u.tenantId);
    }
    createJob(u, dto) {
        return this.svc.createJob(u.tenantId, u.sub, dto);
    }
    updateJob(u, id, dto) {
        return this.svc.updateJob(u.tenantId, id, dto);
    }
    findApplicants(u, id) {
        return this.svc.findApplicants(u.tenantId, id);
    }
    createApplicant(u, id, dto) {
        return this.svc.createApplicant(u.tenantId, u.sub, { ...dto, jobId: id });
    }
    moveStage(u, id, dto) {
        return this.svc.moveApplicantStage(u.tenantId, id, dto.stage);
    }
    generatePayslips(u, id) {
        return this.svc.generatePayslips(u.tenantId, id);
    }
    getPayslips(u, id) {
        return this.svc.getPayslips(u.tenantId, id);
    }
    getAnalytics(u) {
        return this.svc.getHRAnalytics(u.tenantId);
    }
};
exports.HrController = HrController;
__decorate([
    (0, common_1.Get)('employees'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findEmployees", null);
__decorate([
    (0, common_1.Post)('employees'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Get)('employees/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findEmployee", null);
__decorate([
    (0, common_1.Patch)('employees/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.Delete)('employees/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "removeEmployee", null);
__decorate([
    (0, common_1.Get)('departments'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findDepts", null);
__decorate([
    (0, common_1.Post)('departments'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createDept", null);
__decorate([
    (0, common_1.Patch)('departments/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateDept", null);
__decorate([
    (0, common_1.Delete)('departments/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "removeDept", null);
__decorate([
    (0, common_1.Get)('attendance'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findAttendance", null);
__decorate([
    (0, common_1.Get)('attendance/summary'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getAttSummary", null);
__decorate([
    (0, common_1.Post)('attendance'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createAttendance", null);
__decorate([
    (0, common_1.Post)('attendance/clock-in'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "clockIn", null);
__decorate([
    (0, common_1.Post)('attendance/clock-out'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "clockOut", null);
__decorate([
    (0, common_1.Patch)('attendance/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateAttendance", null);
__decorate([
    (0, common_1.Get)('leave-types'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findLeaveTypes", null);
__decorate([
    (0, common_1.Post)('leave-types'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createLeaveType", null);
__decorate([
    (0, common_1.Patch)('leave-types/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateLeaveType", null);
__decorate([
    (0, common_1.Get)('leaves'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findLeaves", null);
__decorate([
    (0, common_1.Post)('leaves'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createLeave", null);
__decorate([
    (0, common_1.Patch)('leaves/:id/approve'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "approveLeave", null);
__decorate([
    (0, common_1.Patch)('leaves/:id/reject'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "rejectLeave", null);
__decorate([
    (0, common_1.Get)('payroll/runs'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findPayrollRuns", null);
__decorate([
    (0, common_1.Post)('payroll/runs'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createPayrollRun", null);
__decorate([
    (0, common_1.Get)('payroll/runs/:id/items'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getPayrollItems", null);
__decorate([
    (0, common_1.Patch)('payroll/items/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updatePayrollItem", null);
__decorate([
    (0, common_1.Patch)('payroll/runs/:id/approve'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "approvePayrollRun", null);
__decorate([
    (0, common_1.Get)('jobs'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findJobs", null);
__decorate([
    (0, common_1.Post)('jobs'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createJob", null);
__decorate([
    (0, common_1.Patch)('jobs/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Get)('jobs/:id/applicants'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "findApplicants", null);
__decorate([
    (0, common_1.Post)('jobs/:id/applicants'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createApplicant", null);
__decorate([
    (0, common_1.Patch)('applicants/:id/stage'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "moveStage", null);
__decorate([
    (0, common_1.Post)('payroll/runs/:id/payslips'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "generatePayslips", null);
__decorate([
    (0, common_1.Get)('payroll/employees/:id/payslips'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getPayslips", null);
__decorate([
    (0, common_1.Get)('analytics'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "getAnalytics", null);
exports.HrController = HrController = __decorate([
    (0, swagger_1.ApiTags)('HR'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('hr'),
    __metadata("design:paramtypes", [hr_service_1.HrService])
], HrController);
//# sourceMappingURL=hr.controller.js.map