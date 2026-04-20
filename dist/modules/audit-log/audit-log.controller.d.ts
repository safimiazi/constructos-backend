import { AuditLogService } from './audit-log.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class AuditLogController {
    private readonly svc;
    constructor(svc: AuditLogService);
    findAll(u: JwtPayload, q: any): Promise<{
        data: import("./audit-log.entity").AuditLog[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
