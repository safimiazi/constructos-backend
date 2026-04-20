import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
export declare class NotificationsService {
    private repo;
    constructor(repo: Repository<Notification>);
    findForUser(userId: string, page?: number, limit?: number): Promise<{
        data: Notification[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    markRead(userId: string, id: string): Promise<void>;
    markAllRead(userId: string): Promise<void>;
    create(dto: Partial<Notification>): Promise<Notification>;
}
