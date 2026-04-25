import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum ProposalStatus {
    DRAFT = "draft",
    SENT = "sent",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
}
export declare enum ContractStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    COMPLETED = "completed",
    TERMINATED = "terminated"
}
export declare class Proposal extends TenantBaseEntity {
    leadId: string | null;
    clientId: string | null;
    title: string;
    items: {
        description: string;
        quantity: number;
        unitPrice: number;
        amount: number;
    }[];
    totalValue: number;
    status: ProposalStatus;
    validUntil: Date | null;
    notes: string | null;
}
export declare class Contract extends TenantBaseEntity {
    clientId: string;
    projectId: string | null;
    proposalId: string | null;
    title: string;
    value: number;
    startDate: Date | null;
    endDate: Date | null;
    status: ContractStatus;
    signedDocUrl: string | null;
    eSignedAt: Date | null;
}
