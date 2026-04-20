import { BaseEntity } from '../../../database/base.entity';
import { UserRole } from '../../../common/interfaces/jwt-payload.interface';
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    INVITED = "invited"
}
export declare class User extends BaseEntity {
    tenantId: string | null;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    avatarUrl: string | null;
    role: UserRole;
    status: UserStatus;
    isSuperAdmin: boolean;
    lastLoginAt: Date | null;
    refreshTokenHash: string | null;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    get fullName(): string;
}
