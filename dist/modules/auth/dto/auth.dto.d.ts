export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterTenantDto {
    companyName: string;
    slug: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    password: string;
}
