import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tenant, TenantStatus } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { Plan } from '../billing/entities/plan.entity';
import { Subscription } from '../billing/entities/subscription.entity';
import { Announcement } from './entities/announcement.entity';
export declare class SuperadminService {
    private tenantRepo;
    private userRepo;
    private planRepo;
    private subRepo;
    private annoRepo;
    private jwtService;
    private configService;
    constructor(tenantRepo: Repository<Tenant>, userRepo: Repository<User>, planRepo: Repository<Plan>, subRepo: Repository<Subscription>, annoRepo: Repository<Announcement>, jwtService: JwtService, configService: ConfigService);
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
    createTenant(dto: Partial<Tenant>): Promise<Tenant>;
    updateTenantStatus(id: string, status: TenantStatus): Promise<Tenant>;
    impersonateTenant(tenantId: string): Promise<{
        accessToken: string;
        tenant: {
            id: string;
            companyName: string;
        };
        user: {
            id: string;
            email: string;
            role: import("../../common/interfaces/jwt-payload.interface").UserRole;
        };
    }>;
    getDashboardStats(): Promise<{
        totalTenants: number;
        activeCount: number;
        trialCount: number;
        suspendedCount: number;
        cancelledCount: number;
        totalUsers: number;
        recentTenants: Tenant[];
        expiringTrials: Tenant[];
    }>;
    getBillingOverview(): Promise<{
        subscriptionsByStatus: any[];
    }>;
    getGrowthAnalytics(): Promise<any[]>;
    getTenantStatusBreakdown(): Promise<{
        name: string;
        value: number;
        color: string;
    }[]>;
    getPlanDistribution(): Promise<{
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
    findPlans(): Promise<Plan[]>;
    createPlan(dto: Partial<Plan>): Promise<Plan>;
    updatePlan(id: string, dto: Partial<Plan>): Promise<Plan | null>;
    findAllUsers(q: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: any[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findAnnouncements(): Promise<Announcement[]>;
    createAnnouncement(dto: Partial<Announcement>): Promise<Announcement>;
    updateAnnouncement(id: string, dto: Partial<Announcement>): Promise<Announcement | null>;
    deleteAnnouncement(id: string): Promise<void>;
    getActiveAnnouncements(): Promise<Announcement[]>;
    getActiveAnnouncementsForTenant(tenantId: string): Promise<Announcement[]>;
}
