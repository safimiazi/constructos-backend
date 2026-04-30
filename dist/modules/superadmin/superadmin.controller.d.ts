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
        cancelledCount: number;
        totalUsers: number;
        recentTenants: import("../tenants/entities/tenant.entity").Tenant[];
        expiringTrials: import("../tenants/entities/tenant.entity").Tenant[];
    }>;
    getBillingOverview(): Promise<{
        subscriptionsByStatus: any[];
    }>;
    getGrowth(): Promise<any[]>;
    getTenantStatus(): Promise<{
        name: string;
        value: number;
        color: string;
    }[]>;
    getPlanDist(): Promise<{
        color: string;
        name: string;
        tier: import("../../common/interfaces/jwt-payload.interface").PlanTier;
        count: number;
    }[]>;
    getTopTenants(): Promise<{
        id: string;
        name: string;
        slug: string;
        status: TenantStatus;
        users: number;
        planName: any;
        planTier: any;
        joinedAt: Date;
    }[]>;
    findTenants(q: any): Promise<{
        data: import("../tenants/entities/tenant.entity").Tenant[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createTenant(dto: any): Promise<import("../tenants/entities/tenant.entity").Tenant>;
    findTenant(id: string): Promise<import("../tenants/entities/tenant.entity").Tenant>;
    updateStatus(id: string, dto: {
        status: TenantStatus;
    }): Promise<import("../tenants/entities/tenant.entity").Tenant>;
    impersonate(id: string): Promise<{
        accessToken: string;
        tenant: {
            id: string;
            companyName: string;
        };
        user: {
            id: string;
            email: string;
            role: UserRole;
        };
    }>;
    findPlans(): Promise<import("../billing/entities/plan.entity").Plan[]>;
    createPlan(dto: any): Promise<import("../billing/entities/plan.entity").Plan>;
    updatePlan(id: string, dto: any): Promise<import("../billing/entities/plan.entity").Plan | null>;
    findAllUsers(q: any): Promise<{
        data: any[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getActiveAnnouncements(): Promise<import("./entities/announcement.entity").Announcement[]>;
    getAnnouncementsForTenant(user: any): Promise<import("./entities/announcement.entity").Announcement[]>;
    findAnnouncements(): Promise<import("./entities/announcement.entity").Announcement[]>;
    createAnnouncement(dto: any): Promise<import("./entities/announcement.entity").Announcement>;
    updateAnnouncement(id: string, dto: any): Promise<import("./entities/announcement.entity").Announcement | null>;
    deleteAnnouncement(id: string): Promise<void>;
}
