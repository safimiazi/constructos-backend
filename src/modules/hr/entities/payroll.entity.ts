import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum PayrollStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  PAID = 'paid',
}

@Entity('payroll_runs')
export class PayrollRun extends TenantBaseEntity {
  @Column({ name: 'pay_period', length: 7 }) // YYYY-MM
  payPeriod: string;

  @Column({ name: 'total_employees', type: 'int', default: 0 })
  totalEmployees: number;

  @Column({ name: 'total_net_pay', type: 'numeric', precision: 15, scale: 2, default: 0 })
  totalNetPay: number;

  @Column({ type: 'enum', enum: PayrollStatus, default: PayrollStatus.DRAFT })
  status: PayrollStatus;

  @Column({ name: 'pay_date', type: 'date', nullable: true })
  payDate: Date | null;

  @Column({ name: 'approved_by', type: 'uuid', nullable: true })
  approvedBy: string | null;
}

@Entity('payroll_items')
export class PayrollItem extends TenantBaseEntity {
  @Column({ name: 'run_id', type: 'uuid' })
  runId: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ name: 'basic_salary', type: 'numeric', precision: 12, scale: 2 })
  basicSalary: number;

  @Column({ name: 'overtime_pay', type: 'numeric', precision: 12, scale: 2, default: 0 })
  overtimePay: number;

  @Column({ type: 'jsonb', default: '[]' })
  bonuses: { label: string; amount: number }[];

  @Column({ type: 'jsonb', default: '[]' })
  deductions: { label: string; amount: number }[];

  @Column({ name: 'total_bonuses', type: 'numeric', precision: 12, scale: 2, default: 0 })
  totalBonuses: number;

  @Column({ name: 'total_deductions', type: 'numeric', precision: 12, scale: 2, default: 0 })
  totalDeductions: number;

  @Column({ name: 'net_pay', type: 'numeric', precision: 12, scale: 2 })
  netPay: number;
}
