export declare enum UserRole {
    SUPERADMIN = "SUPERADMIN",
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    PROJECT_MANAGER = "PROJECT_MANAGER",
    FINANCE_MANAGER = "FINANCE_MANAGER",
    HR_MANAGER = "HR_MANAGER",
    PROCUREMENT_OFFICER = "PROCUREMENT_OFFICER",
    SITE_ENGINEER = "SITE_ENGINEER",
    SALES_MANAGER = "SALES_MANAGER",
    ACCOUNTANT = "ACCOUNTANT",
    CLIENT = "CLIENT",
    SUBCONTRACTOR = "SUBCONTRACTOR"
}
export declare enum PlanTier {
    STARTER = "STARTER",
    PROFESSIONAL = "PROFESSIONAL",
    ENTERPRISE = "ENTERPRISE"
}
export interface JwtPayload {
    sub: string;
    tenantId: string | null;
    role: UserRole;
    planTier: PlanTier | null;
    isSuperAdmin: boolean;
    email: string;
}
