import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum AttendanceStatus {
    PRESENT = "present",
    ABSENT = "absent",
    LATE = "late",
    HALF_DAY = "half_day",
    ON_LEAVE = "on_leave"
}
export declare class Attendance extends TenantBaseEntity {
    employeeId: string;
    date: Date;
    checkIn: Date | null;
    checkOut: Date | null;
    status: AttendanceStatus;
    workingHours: number;
    overtimeHours: number;
    notes: string | null;
    location: string | null;
}
