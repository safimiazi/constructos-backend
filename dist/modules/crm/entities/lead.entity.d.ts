import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum LeadStage {
    NEW = "new",
    QUALIFIED = "qualified",
    PROPOSAL = "proposal",
    NEGOTIATION = "negotiation",
    WON = "won",
    LOST = "lost"
}
export declare class Lead extends TenantBaseEntity {
    name: string;
    contactInfo: {
        email?: string;
        phone?: string;
        company?: string;
    };
    source: string | null;
    assignedTo: string | null;
    stage: LeadStage;
    expectedValue: number;
    expectedCloseDate: Date | null;
    notes: string | null;
}
