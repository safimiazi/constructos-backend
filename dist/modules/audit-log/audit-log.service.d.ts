import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';
export declare class AuditLogService {
    private repo;
    constructor(repo: Repository<AuditLog>);
    log(dto: Partial<AuditLog>): Promise<AuditLog>;
    findAll(q: {
        tenantId?: string;
        userId?: string;
        action?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: AuditLog[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
