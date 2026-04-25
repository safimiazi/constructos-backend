import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum RFQStatus {
    DRAFT = "draft",
    SENT = "sent",
    AWARDED = "awarded",
    CANCELLED = "cancelled"
}
export declare class RFQ extends TenantBaseEntity {
    rfqNumber: string;
    projectId: string | null;
    items: {
        description: string;
        quantity: number;
        unit: string;
    }[];
    vendorIds: string[];
    awardedVendorId: string | null;
    status: RFQStatus;
    deadline: Date | null;
    notes: string | null;
}
export declare class GRN extends TenantBaseEntity {
    poId: string;
    receivedAt: Date;
    status: string;
    items: {
        description: string;
        qtyOrdered: number;
        qtyReceived: number;
        qtyAccepted: number;
        rejectionReason?: string;
    }[];
    notes: string | null;
}
