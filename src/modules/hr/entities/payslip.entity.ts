import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('payslips')
export class Payslip extends TenantBaseEntity {
  @Column({ name: 'payroll_item_id', type: 'uuid' })
  payrollItemId: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId: string;

  @Column({ name: 'pay_period', length: 7 })
  payPeriod: string;

  @Column({ name: 'pdf_url', type: 'varchar', nullable: true })
  pdfUrl: string | null;

  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sentAt: Date | null;

  // Snapshot of payroll data
  @Column({ name: 'basic_salary', type: 'numeric', precision: 12, scale: 2 })
  basicSalary: number;

  @Column({ name: 'overtime_pay', type: 'numeric', precision: 12, scale: 2, default: 0 })
  overtimePay: number;

  @Column({ type: 'jsonb', default: '[]' })
  bonuses: { label: string; amount: number }[];

  @Column({ type: 'jsonb', default: '[]' })
  deductions: { label: string; amount: number }[];

  @Column({ name: 'net_pay', type: 'numeric', precision: 12, scale: 2 })
  netPay: number;
}
