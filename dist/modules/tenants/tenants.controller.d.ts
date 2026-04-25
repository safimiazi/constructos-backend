import { TenantsService } from './tenants.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class TenantsController {
    private readonly svc;
    constructor(svc: TenantsService);
    getCompany(u: JwtPayload): Promise<import("./entities/tenant.entity").Tenant>;
    updateCompany(u: JwtPayload, dto: any): Promise<import("./entities/tenant.entity").Tenant>;
}
