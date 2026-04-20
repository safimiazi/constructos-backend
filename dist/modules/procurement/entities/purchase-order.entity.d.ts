import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum POStatus {
    DRAFT = "draft",
    SENT = "sent",
    APPROVED = "approved",
    RECEIVED = "received",
    CANCELLED = "cancelled"
}
export declare class PurchaseOrder extends TenantBaseEntity {
    poNumber: string;
    vendorId: string;
    projectId: string | null;
    items: {
        description: string;
        quantity: number;
        unitCost: number;
        totalCost: number;
    }[];
    totalCost: number;
    status: POStatus;
    expectedDate: Date | null;
    receivedDate: Date | null;
    notes: string | null;
}
