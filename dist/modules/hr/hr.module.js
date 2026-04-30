"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const attendance_entity_1 = require("./entities/attendance.entity");
const leave_entity_1 = require("./entities/leave.entity");
const payroll_entity_1 = require("./entities/payroll.entity");
const department_entity_1 = require("./entities/department.entity");
const job_posting_entity_1 = require("./entities/job-posting.entity");
const leave_type_entity_1 = require("./entities/leave-type.entity");
const payslip_entity_1 = require("./entities/payslip.entity");
const hr_service_1 = require("./hr.service");
const hr_controller_1 = require("./hr.controller");
let HrModule = class HrModule {
};
exports.HrModule = HrModule;
exports.HrModule = HrModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee, attendance_entity_1.Attendance, leave_entity_1.Leave, payroll_entity_1.PayrollRun, payroll_entity_1.PayrollItem, department_entity_1.Department, job_posting_entity_1.JobPosting, job_posting_entity_1.Applicant, leave_type_entity_1.LeaveType, payslip_entity_1.Payslip])],
        controllers: [hr_controller_1.HrController],
        providers: [hr_service_1.HrService],
        exports: [hr_service_1.HrService],
    })
], HrModule);
//# sourceMappingURL=hr.module.js.map