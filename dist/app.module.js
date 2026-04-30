"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const throttler_2 = require("@nestjs/throttler");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const tenants_module_1 = require("./modules/tenants/tenants.module");
const billing_module_1 = require("./modules/billing/billing.module");
const projects_module_1 = require("./modules/projects/projects.module");
const hr_module_1 = require("./modules/hr/hr.module");
const finance_module_1 = require("./modules/finance/finance.module");
const procurement_module_1 = require("./modules/procurement/procurement.module");
const crm_module_1 = require("./modules/crm/crm.module");
const hse_module_1 = require("./modules/hse/hse.module");
const documents_module_1 = require("./modules/documents/documents.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const superadmin_module_1 = require("./modules/superadmin/superadmin.module");
const audit_log_module_1 = require("./modules/audit-log/audit-log.module");
const user_entity_1 = require("./modules/users/entities/user.entity");
const role_permission_entity_1 = require("./modules/users/entities/role-permission.entity");
const tenant_entity_1 = require("./modules/tenants/entities/tenant.entity");
const branch_entity_1 = require("./modules/tenants/entities/branch.entity");
const plan_entity_1 = require("./modules/billing/entities/plan.entity");
const subscription_entity_1 = require("./modules/billing/entities/subscription.entity");
const project_entity_1 = require("./modules/projects/entities/project.entity");
const task_entity_1 = require("./modules/projects/entities/task.entity");
const daily_log_entity_1 = require("./modules/projects/entities/daily-log.entity");
const milestone_entity_1 = require("./modules/projects/entities/milestone.entity");
const issue_entity_1 = require("./modules/projects/entities/issue.entity");
const task_dependency_entity_1 = require("./modules/projects/entities/task-dependency.entity");
const subcontract_entity_1 = require("./modules/projects/entities/subcontract.entity");
const risk_entity_1 = require("./modules/projects/entities/risk.entity");
const defect_entity_1 = require("./modules/projects/entities/defect.entity");
const employee_entity_1 = require("./modules/hr/entities/employee.entity");
const attendance_entity_1 = require("./modules/hr/entities/attendance.entity");
const leave_entity_1 = require("./modules/hr/entities/leave.entity");
const payroll_entity_1 = require("./modules/hr/entities/payroll.entity");
const department_entity_1 = require("./modules/hr/entities/department.entity");
const job_posting_entity_1 = require("./modules/hr/entities/job-posting.entity");
const leave_type_entity_1 = require("./modules/hr/entities/leave-type.entity");
const payslip_entity_1 = require("./modules/hr/entities/payslip.entity");
const invoice_entity_1 = require("./modules/finance/entities/invoice.entity");
const budget_entity_1 = require("./modules/finance/entities/budget.entity");
const bank_account_entity_1 = require("./modules/finance/entities/bank-account.entity");
const journal_entity_1 = require("./modules/finance/entities/journal.entity");
const tax_entity_1 = require("./modules/finance/entities/tax.entity");
const bank_transaction_entity_1 = require("./modules/finance/entities/bank-transaction.entity");
const vendor_entity_1 = require("./modules/procurement/entities/vendor.entity");
const purchase_order_entity_1 = require("./modules/procurement/entities/purchase-order.entity");
const material_request_entity_1 = require("./modules/procurement/entities/material-request.entity");
const inventory_entity_1 = require("./modules/procurement/entities/inventory.entity");
const rfq_entity_1 = require("./modules/procurement/entities/rfq.entity");
const three_way_match_entity_1 = require("./modules/procurement/entities/three-way-match.entity");
const client_entity_1 = require("./modules/crm/entities/client.entity");
const lead_entity_1 = require("./modules/crm/entities/lead.entity");
const proposal_entity_1 = require("./modules/crm/entities/proposal.entity");
const incident_entity_1 = require("./modules/hse/entities/incident.entity");
const ptw_entity_1 = require("./modules/hse/entities/ptw.entity");
const document_entity_1 = require("./modules/documents/entities/document.entity");
const notification_entity_1 = require("./modules/notifications/entities/notification.entity");
const audit_log_entity_1 = require("./modules/audit-log/audit-log.entity");
const announcement_entity_1 = require("./modules/superadmin/entities/announcement.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST', 'localhost'),
                    port: config.get('DB_PORT', 5432),
                    username: config.get('DB_USERNAME', 'postgres'),
                    password: config.get('DB_PASSWORD', 'postgres'),
                    database: config.get('DB_NAME', 'constructos'),
                    entities: [
                        user_entity_1.User, role_permission_entity_1.CustomRole, tenant_entity_1.Tenant, branch_entity_1.Branch, plan_entity_1.Plan, subscription_entity_1.Subscription,
                        project_entity_1.Project, task_entity_1.Task, daily_log_entity_1.DailyLog, milestone_entity_1.Milestone, issue_entity_1.Issue, task_dependency_entity_1.TaskDependency, subcontract_entity_1.Subcontract, risk_entity_1.Risk, defect_entity_1.Defect,
                        employee_entity_1.Employee, attendance_entity_1.Attendance, leave_entity_1.Leave, payroll_entity_1.PayrollRun, payroll_entity_1.PayrollItem, department_entity_1.Department, job_posting_entity_1.JobPosting, job_posting_entity_1.Applicant, leave_type_entity_1.LeaveType, payslip_entity_1.Payslip,
                        invoice_entity_1.Invoice, budget_entity_1.Budget, bank_account_entity_1.BankAccount, journal_entity_1.ChartOfAccount, journal_entity_1.JournalEntry, journal_entity_1.InvoicePayment, tax_entity_1.TaxRate, tax_entity_1.ExpenseClaim, bank_transaction_entity_1.BankTransaction,
                        vendor_entity_1.Vendor, purchase_order_entity_1.PurchaseOrder, material_request_entity_1.MaterialRequest, inventory_entity_1.Inventory, rfq_entity_1.RFQ, rfq_entity_1.GRN, three_way_match_entity_1.ThreeWayMatch,
                        client_entity_1.Client, lead_entity_1.Lead, proposal_entity_1.Proposal, proposal_entity_1.Contract,
                        incident_entity_1.Incident, ptw_entity_1.PermitToWork, ptw_entity_1.SafetyChecklist, document_entity_1.Document, notification_entity_1.Notification, audit_log_entity_1.AuditLog, announcement_entity_1.Announcement,
                    ],
                    synchronize: config.get('NODE_ENV') !== 'production',
                    migrationsRun: config.get('NODE_ENV') === 'production',
                    logging: config.get('NODE_ENV') === 'development',
                }),
            }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            auth_module_1.AuthModule, users_module_1.UsersModule, tenants_module_1.TenantsModule, billing_module_1.BillingModule,
            projects_module_1.ProjectsModule, hr_module_1.HrModule, finance_module_1.FinanceModule, procurement_module_1.ProcurementModule,
            crm_module_1.CrmModule, hse_module_1.HseModule, documents_module_1.DocumentsModule,
            notifications_module_1.NotificationsModule, superadmin_module_1.SuperadminModule, audit_log_module_1.AuditLogModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_2.ThrottlerGuard },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
            { provide: core_1.APP_FILTER, useClass: http_exception_filter_1.AllExceptionsFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map