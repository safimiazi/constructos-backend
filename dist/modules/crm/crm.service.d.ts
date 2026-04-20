import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { Lead, LeadStage } from './entities/lead.entity';
export declare class CrmService {
    private clientRepo;
    private leadRepo;
    constructor(clientRepo: Repository<Client>, leadRepo: Repository<Lead>);
    findClients(tenantId: string, q: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Client[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findClient(tenantId: string, id: string): Promise<Client>;
    createClient(tenantId: string, userId: string, dto: Partial<Client>): Promise<Client>;
    updateClient(tenantId: string, id: string, dto: Partial<Client>): Promise<Client>;
    removeClient(tenantId: string, id: string): Promise<void>;
    findLeads(tenantId: string, q: {
        stage?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Lead[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findLead(tenantId: string, id: string): Promise<Lead>;
    createLead(tenantId: string, userId: string, dto: Partial<Lead>): Promise<Lead>;
    updateLead(tenantId: string, id: string, dto: Partial<Lead>): Promise<Lead>;
    moveLeadStage(tenantId: string, id: string, stage: LeadStage): Promise<Lead>;
    removeLead(tenantId: string, id: string): Promise<void>;
    getPipelineSummary(tenantId: string): Promise<any[]>;
}
