import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { BillingModule } from './modules/billing/billing.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { HrModule } from './modules/hr/hr.module';
import { FinanceModule } from './modules/finance/finance.module';
import { ProcurementModule } from './modules/procurement/procurement.module';
import { CrmModule } from './modules/crm/crm.module';
import { HseModule } from './modules/hse/hse.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SuperadminModule } from './modules/superadmin/superadmin.module';
import { AuditLogModule } from './modules/audit-log/audit-log.module';

// Entities
import { User } from './modules/users/entities/user.entity';
import { Tenant } from './modules/tenants/entities/tenant.entity';
import { Plan } from './modules/billing/entities/plan.entity';
import { Subscription } from './modules/billing/entities/subscription.entity';
import { Project } from './modules/projects/entities/project.entity';
import { Task } from './modules/projects/entities/task.entity';
import { DailyLog } from './modules/projects/entities/daily-log.entity';
import { Milestone } from './modules/projects/entities/milestone.entity';
import { Issue } from './modules/projects/entities/issue.entity';
import { Employee } from './modules/hr/entities/employee.entity';
import { Attendance } from './modules/hr/entities/attendance.entity';
import { Leave } from './modules/hr/entities/leave.entity';
import { PayrollRun, PayrollItem } from './modules/hr/entities/payroll.entity';
import { Department } from './modules/hr/entities/department.entity';
import { JobPosting, Applicant } from './modules/hr/entities/job-posting.entity';
import { Invoice } from './modules/finance/entities/invoice.entity';
import { Budget } from './modules/finance/entities/budget.entity';
import { BankAccount } from './modules/finance/entities/bank-account.entity';
import { Vendor } from './modules/procurement/entities/vendor.entity';
import { PurchaseOrder } from './modules/procurement/entities/purchase-order.entity';
import { MaterialRequest } from './modules/procurement/entities/material-request.entity';
import { Inventory } from './modules/procurement/entities/inventory.entity';
import { Client } from './modules/crm/entities/client.entity';
import { Lead } from './modules/crm/entities/lead.entity';
import { Incident } from './modules/hse/entities/incident.entity';
import { Document } from './modules/documents/entities/document.entity';
import { Notification } from './modules/notifications/entities/notification.entity';
import { AuditLog } from './modules/audit-log/audit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'constructos'),
        entities: [
          User, Tenant, Plan, Subscription,
          Project, Task, DailyLog, Milestone, Issue,
          Employee, Attendance, Leave, PayrollRun, PayrollItem, Department, JobPosting, Applicant,
          Invoice, Budget, BankAccount,
          Vendor, PurchaseOrder, MaterialRequest, Inventory,
          Client, Lead,
          Incident,
          Document,
          Notification,
          AuditLog,
        ],
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),

    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),

    AuthModule, UsersModule, TenantsModule, BillingModule,
    ProjectsModule, HrModule, FinanceModule, ProcurementModule,
    CrmModule, HseModule, DocumentsModule,
    NotificationsModule, SuperadminModule, AuditLogModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
