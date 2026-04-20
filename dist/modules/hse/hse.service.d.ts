import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
export declare class HseService {
    private repo;
    constructor(repo: Repository<Incident>);
    findAll(tenantId: string, q: {
        projectId?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Incident[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(tenantId: string, id: string): Promise<Incident>;
    create(tenantId: string, userId: string, dto: Partial<Incident>): Promise<Incident>;
    update(tenantId: string, id: string, dto: Partial<Incident>): Promise<Incident>;
    close(tenantId: string, id: string): Promise<Incident>;
    getStats(tenantId: string): Promise<any[]>;
}
