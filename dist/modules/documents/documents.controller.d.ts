import { DocumentsService } from './documents.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class DocumentsController {
    private readonly svc;
    constructor(svc: DocumentsService);
    findAll(u: JwtPayload, q: any): Promise<{
        data: import("./entities/document.entity").Document[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getFolders(u: JwtPayload): Promise<any[]>;
    create(u: JwtPayload, dto: any): Promise<import("./entities/document.entity").Document>;
    findOne(u: JwtPayload, id: string): Promise<import("./entities/document.entity").Document>;
    update(u: JwtPayload, id: string, dto: any): Promise<import("./entities/document.entity").Document>;
    approve(u: JwtPayload, id: string): Promise<import("./entities/document.entity").Document>;
    remove(u: JwtPayload, id: string): Promise<void>;
}
