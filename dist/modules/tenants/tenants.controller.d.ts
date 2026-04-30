import { TenantsService } from './tenants.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class TenantsController {
    private readonly svc;
    constructor(svc: TenantsService);
    getCompany(u: JwtPayload): Promise<import("./entities/tenant.entity").Tenant>;
    updateCompany(u: JwtPayload, dto: any): Promise<import("./entities/tenant.entity").Tenant>;
    getBranches(u: JwtPayload): Promise<import("./entities/branch.entity").Branch[]>;
    createBranch(u: JwtPayload, dto: any): Promise<import("./entities/branch.entity").Branch>;
    updateBranch(u: JwtPayload, id: string, dto: any): Promise<import("./entities/branch.entity").Branch | null>;
    removeBranch(u: JwtPayload, id: string): Promise<void>;
}
