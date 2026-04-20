import { CrmService } from './crm.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { LeadStage } from './entities/lead.entity';
export declare class CrmController {
    private readonly svc;
    constructor(svc: CrmService);
    findClients(u: JwtPayload, q: any): Promise<{
        data: import("./entities/client.entity").Client[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createClient(u: JwtPayload, dto: any): Promise<import("./entities/client.entity").Client>;
    findClient(u: JwtPayload, id: string): Promise<import("./entities/client.entity").Client>;
    updateClient(u: JwtPayload, id: string, dto: any): Promise<import("./entities/client.entity").Client>;
    removeClient(u: JwtPayload, id: string): Promise<void>;
    getPipeline(u: JwtPayload): Promise<any[]>;
    findLeads(u: JwtPayload, q: any): Promise<{
        data: import("./entities/lead.entity").Lead[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createLead(u: JwtPayload, dto: any): Promise<import("./entities/lead.entity").Lead>;
    findLead(u: JwtPayload, id: string): Promise<import("./entities/lead.entity").Lead>;
    updateLead(u: JwtPayload, id: string, dto: any): Promise<import("./entities/lead.entity").Lead>;
    moveStage(u: JwtPayload, id: string, dto: {
        stage: LeadStage;
    }): Promise<import("./entities/lead.entity").Lead>;
    removeLead(u: JwtPayload, id: string): Promise<void>;
}
