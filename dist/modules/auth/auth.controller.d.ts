import { AuthService } from './auth.service';
import { LoginDto, RegisterTenantDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterTenantDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import("../../common/interfaces/jwt-payload.interface").UserRole;
            firstName: string;
            lastName: string;
            tenantId: string | null;
            isSuperAdmin: boolean;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import("../../common/interfaces/jwt-payload.interface").UserRole;
            firstName: string;
            lastName: string;
            tenantId: string | null;
            isSuperAdmin: boolean;
        };
    }>;
    logout(userId: string): Promise<void>;
    refresh(userId: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import("../../common/interfaces/jwt-payload.interface").UserRole;
            firstName: string;
            lastName: string;
            tenantId: string | null;
            isSuperAdmin: boolean;
        };
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
        resetToken?: undefined;
    } | {
        message: string;
        resetToken: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
