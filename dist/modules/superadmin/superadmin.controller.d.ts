import { SuperadminService } from './superadmin.service';
import { UserRole } from '../../common/interfaces/jwt-payload.interface';
import { TenantStatus } from '../tenants/entities/tenant.entity';
export declare class SuperadminController {
    private readonly svc;
    constructor(svc: SuperadminService);
    getStats(): Promise<{
        totalTenants: number;
        activeCount: number;
        trialCount: number;
        suspendedCount: number;
        totalUsers: number;
        recentTenants: import("../tenants/entities/tenant.entity").Tenant[];
    }>;
    findTenants(q: any): Promise<{
        data: import("../tenants/entities/tenant.entity").Tenant[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findTenant(id: string): Promise<import("../tenants/entities/tenant.entity").Tenant>;
    updateStatus(id: string, dto: {
        status: TenantStatus;
    }): Promise<import("../tenants/entities/tenant.entity").Tenant>;
    findPlans(): Promise<import("../billing/entities/plan.entity").Plan[]>;
    createPlan(dto: any): Promise<import("../billing/entities/plan.entity").Plan>;
    updatePlan(id: string, dto: any): Promise<import("../billing/entities/plan.entity").Plan | null>;
    findAllUsers(q: any): Promise<{
        data: {
            passwordHash: undefined;
            refreshTokenHash: undefined;
            tenantId: string | null;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            avatarUrl: string | null;
            role: UserRole;
            status: import("../users/entities/user.entity").UserStatus;
            isSuperAdmin: boolean;
            lastLoginAt: Date | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
