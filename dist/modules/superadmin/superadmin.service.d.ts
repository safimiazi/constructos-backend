import { Repository } from 'typeorm';
import { Tenant, TenantStatus } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { Plan } from '../billing/entities/plan.entity';
import { Subscription } from '../billing/entities/subscription.entity';
export declare class SuperadminService {
    private tenantRepo;
    private userRepo;
    private planRepo;
    private subRepo;
    constructor(tenantRepo: Repository<Tenant>, userRepo: Repository<User>, planRepo: Repository<Plan>, subRepo: Repository<Subscription>);
    findTenants(q: {
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Tenant[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findTenant(id: string): Promise<Tenant>;
    updateTenantStatus(id: string, status: TenantStatus): Promise<Tenant>;
    getDashboardStats(): Promise<{
        totalTenants: number;
        activeCount: number;
        trialCount: number;
        suspendedCount: number;
        totalUsers: number;
        recentTenants: Tenant[];
    }>;
    findPlans(): Promise<Plan[]>;
    createPlan(dto: Partial<Plan>): Promise<Plan>;
    updatePlan(id: string, dto: Partial<Plan>): Promise<Plan | null>;
    findAllUsers(q: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: {
            passwordHash: undefined;
            refreshTokenHash: undefined;
            tenantId: string | null;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            avatarUrl: string | null;
            role: import("../../common/interfaces/jwt-payload.interface").UserRole;
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
