import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum EmploymentType {
    FULL_TIME = "full_time",
    PART_TIME = "part_time",
    CONTRACT = "contract",
    DAILY_LABOR = "daily_labor"
}
export declare enum EmployeeStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    ON_LEAVE = "on_leave",
    TERMINATED = "terminated"
}
export declare class Employee extends TenantBaseEntity {
    userId: string | null;
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    departmentId: string | null;
    designation: string | null;
    employmentType: EmploymentType;
    status: EmployeeStatus;
    joinDate: Date;
    basicSalary: number;
    nidNumber: string | null;
    avatarUrl: string | null;
    branchId: string | null;
}
