import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum InvoiceStatus {
    DRAFT = "draft",
    SENT = "sent",
    PAID = "paid",
    OVERDUE = "overdue",
    CANCELLED = "cancelled"
}
export declare enum InvoiceType {
    CLIENT = "client",
    VENDOR = "vendor"
}
export declare class Invoice extends TenantBaseEntity {
    invoiceNumber: string;
    type: InvoiceType;
    projectId: string | null;
    clientId: string | null;
    vendorId: string | null;
    items: {
        description: string;
        quantity: number;
        unitPrice: number;
        amount: number;
    }[];
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
    paidAmount: number;
    status: InvoiceStatus;
    issueDate: Date;
    dueDate: Date;
    notes: string | null;
}
