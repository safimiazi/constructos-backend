import { HseService } from './hse.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class HseController {
    private readonly svc;
    constructor(svc: HseService);
    findAll(u: JwtPayload, q: any): Promise<{
        data: import("./entities/incident.entity").Incident[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getStats(u: JwtPayload): Promise<any[]>;
    create(u: JwtPayload, dto: any): Promise<import("./entities/incident.entity").Incident>;
    findOne(u: JwtPayload, id: string): Promise<import("./entities/incident.entity").Incident>;
    update(u: JwtPayload, id: string, dto: any): Promise<import("./entities/incident.entity").Incident>;
    close(u: JwtPayload, id: string): Promise<import("./entities/incident.entity").Incident>;
}
