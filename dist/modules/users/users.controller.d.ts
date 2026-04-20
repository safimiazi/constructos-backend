import { UsersService } from './users.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class UsersController {
    private readonly svc;
    constructor(svc: UsersService);
    getProfile(u: JwtPayload): Promise<any>;
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
}
