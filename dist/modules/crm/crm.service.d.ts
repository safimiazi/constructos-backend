import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { Lead, LeadStage } from './entities/lead.entity';
import { Proposal, ProposalStatus, Contract } from './entities/proposal.entity';
export declare class CrmService {
    private clientRepo;
    private leadRepo;
    private proposalRepo;
    private contractRepo;
    constructor(clientRepo: Repository<Client>, leadRepo: Repository<Lead>, proposalRepo: Repository<Proposal>, contractRepo: Repository<Contract>);
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
    getAnalytics(tenantId: string): Promise<{
        totalLeads: number;
        wonLeads: number;
        conversionRate: number;
        totalProposals: number;
        totalContracts: number;
    }>;
    findProposals(tenantId: string): Promise<Proposal[]>;
    createProposal(tenantId: string, userId: string, dto: Partial<Proposal>): Promise<Proposal>;
    updateProposalStatus(tenantId: string, id: string, status: ProposalStatus): Promise<Proposal | null>;
    findContracts(tenantId: string): Promise<Contract[]>;
    createContract(tenantId: string, userId: string, dto: Partial<Contract>): Promise<Contract>;
    signContract(tenantId: string, id: string): Promise<Contract | null>;
}
