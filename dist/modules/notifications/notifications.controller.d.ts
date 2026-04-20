import { NotificationsService } from './notifications.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class NotificationsController {
    private readonly svc;
    constructor(svc: NotificationsService);
    findAll(u: JwtPayload, page?: string, limit?: string): Promise<{
        data: import("./entities/notification.entity").Notification[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    unreadCount(u: JwtPayload): Promise<{
        count: number;
    }>;
    markRead(u: JwtPayload, id: string): Promise<void>;
    markAllRead(u: JwtPayload): Promise<void>;
}
