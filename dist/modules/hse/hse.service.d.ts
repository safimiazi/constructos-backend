import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { PermitToWork, SafetyChecklist } from './entities/ptw.entity';
export declare class HseService {
    private incidentRepo;
    private ptwRepo;
    private checklistRepo;
    constructor(incidentRepo: Repository<Incident>, ptwRepo: Repository<PermitToWork>, checklistRepo: Repository<SafetyChecklist>);
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
    getHSEDashboard(tenantId: string): Promise<{
        openIncidents: number;
        totalIncidents: number;
        activePTW: number;
        totalChecklists: number;
    }>;
    findPTWs(tenantId: string, q: {
        projectId?: string;
        status?: string;
    }): Promise<PermitToWork[]>;
    createPTW(tenantId: string, userId: string, dto: Partial<PermitToWork>): Promise<PermitToWork>;
    updatePTW(tenantId: string, id: string, dto: Partial<PermitToWork>): Promise<PermitToWork | null>;
    closePTW(tenantId: string, id: string): Promise<PermitToWork | null>;
    findChecklists(tenantId: string, projectId?: string): Promise<SafetyChecklist[]>;
    createChecklist(tenantId: string, userId: string, dto: Partial<SafetyChecklist>): Promise<SafetyChecklist>;
    submitChecklist(tenantId: string, id: string, responses: {
        question: string;
        answer: boolean;
        notes?: string;
    }[]): Promise<SafetyChecklist | null>;
}
