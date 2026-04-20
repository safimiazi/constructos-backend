import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum LeaveType {
    SICK = "sick",
    CASUAL = "casual",
    ANNUAL = "annual",
    UNPAID = "unpaid",
    MATERNITY = "maternity"
}
export declare enum LeaveStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}
export declare class Leave extends TenantBaseEntity {
    employeeId: string;
    leaveType: LeaveType;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    reason: string;
    status: LeaveStatus;
    approvedBy: string | null;
    approvedAt: Date | null;
    rejectionReason: string | null;
}
