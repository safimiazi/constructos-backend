import { Repository, DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { LoginDto, RegisterTenantDto } from './dto/auth.dto';
import { UserRole } from '../../common/interfaces/jwt-payload.interface';
export declare class AuthService {
    private userRepo;
    private tenantRepo;
    private jwtService;
    private configService;
    private dataSource;
    constructor(userRepo: Repository<User>, tenantRepo: Repository<Tenant>, jwtService: JwtService, configService: ConfigService, dataSource: DataSource);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            firstName: string;
            lastName: string;
            tenantId: string | null;
            isSuperAdmin: boolean;
        };
    }>;
    registerTenant(dto: RegisterTenantDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            firstName: string;
            lastName: string;
            tenantId: string | null;
            isSuperAdmin: boolean;
        };
    }>;
    refreshToken(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            firstName: string;
            lastName: string;
            tenantId: string | null;
            isSuperAdmin: boolean;
        };
    }>;
    logout(userId: string): Promise<void>;
    private generateTokens;
}
