import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CustomRole } from './entities/role-permission.entity';
import { UserRole } from '../../common/interfaces/jwt-payload.interface';
export declare class UsersService {
    private repo;
    private roleRepo;
    constructor(repo: Repository<User>, roleRepo: Repository<CustomRole>);
    findAll(tenantId: string, q: {
        search?: string;
        role?: string;
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
    findOne(tenantId: string, id: string): Promise<any>;
    invite(tenantId: string, dto: {
        email: string;
        firstName: string;
        lastName: string;
        role: UserRole;
        password: string;
    }): Promise<any>;
    update(tenantId: string, id: string, dto: Partial<User>): Promise<any>;
    remove(tenantId: string, id: string): Promise<void>;
    getProfile(userId: string): Promise<any>;
    private sanitize;
    findRoles(tenantId: string): Promise<CustomRole[]>;
    createRole(tenantId: string, userId: string, dto: Partial<CustomRole>): Promise<CustomRole>;
    updateRole(tenantId: string, id: string, dto: Partial<CustomRole>): Promise<CustomRole | null>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
}
