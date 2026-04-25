import { BaseEntity } from '../../../database/base.entity';
export declare enum AnnouncementType {
    INFO = "info",
    WARNING = "warning",
    MAINTENANCE = "maintenance"
}
export declare class Announcement extends BaseEntity {
    title: string;
    message: string;
    type: AnnouncementType;
    isActive: boolean;
    expiresAt: Date | null;
    targetTenantIds: string[];
}
