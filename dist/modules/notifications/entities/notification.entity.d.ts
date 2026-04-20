import { BaseEntity } from '../../../database/base.entity';
export declare class Notification extends BaseEntity {
    userId: string;
    tenantId: string | null;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    actionUrl: string | null;
    metadata: Record<string, unknown>;
}
