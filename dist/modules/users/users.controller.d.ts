import { UsersService } from './users.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class UsersController {
    private readonly svc;
    constructor(svc: UsersService);
    getProfile(u: JwtPayload): Promise<any>;
    changePassword(u: JwtPayload, dto: {
        currentPassword: string;
        newPassword: string;
    }): Promise<void>;
    findAll(u: JwtPayload, q: any): Promise<{
        data: any[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    invite(u: JwtPayload, dto: any): Promise<any>;
    findOne(u: JwtPayload, id: string): Promise<any>;
    update(u: JwtPayload, id: string, dto: any): Promise<any>;
    remove(u: JwtPayload, id: string): Promise<void>;
    getRoles(u: JwtPayload): Promise<import("./entities/role-permission.entity").CustomRole[]>;
    createRole(u: JwtPayload, dto: any): Promise<import("./entities/role-permission.entity").CustomRole>;
    updateRole(u: JwtPayload, id: string, dto: any): Promise<import("./entities/role-permission.entity").CustomRole | null>;
}
