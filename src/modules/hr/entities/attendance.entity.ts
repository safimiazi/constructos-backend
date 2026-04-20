import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  HALF_DAY = 'half_day',
  ON_LEAVE = 'on_leave',
}

@Entity('attendance')
export class Attendance extends TenantBaseEntity {
  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'check_in', type: 'timestamptz', nullable: true })
  checkIn: Date | null;

  @Column({ name: 'check_out', type: 'timestamptz', nullable: true })
  checkOut: Date | null;

  @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.PRESENT })
  status: AttendanceStatus;

  @Column({ name: 'working_hours', type: 'numeric', precision: 5, scale: 2, default: 0 })
  workingHours: number;

  @Column({ name: 'overtime_hours', type: 'numeric', precision: 5, scale: 2, default: 0 })
  overtimeHours: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'location', type: 'varchar', nullable: true })
  location: string | null;
}
