import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum DocumentStatus {
    DRAFT = "draft",
    UNDER_REVIEW = "under_review",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Document extends TenantBaseEntity {
    name: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string | null;
    projectId: string | null;
    folder: string | null;
    status: DocumentStatus;
    version: number;
    description: string | null;
}
