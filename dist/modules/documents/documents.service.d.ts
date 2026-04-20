import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
export declare class DocumentsService {
    private repo;
    constructor(repo: Repository<Document>);
    findAll(tenantId: string, q: {
        projectId?: string;
        folder?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Document[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(tenantId: string, id: string): Promise<Document>;
    create(tenantId: string, userId: string, dto: Partial<Document>): Promise<Document>;
    update(tenantId: string, id: string, dto: Partial<Document>): Promise<Document>;
    approve(tenantId: string, id: string): Promise<Document>;
    remove(tenantId: string, id: string): Promise<void>;
    getFolders(tenantId: string): Promise<any[]>;
}
