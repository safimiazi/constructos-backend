import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('tax_rates')
export class TaxRate extends TenantBaseEntity {
  @Column({ length: 100 })
  name: string; // e.g. "VAT 15%", "Withholding Tax 5%"

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  rate: number; // percentage

  @Column({ type: 'varchar', default: 'VAT' })
  type: string; // VAT | WHT | SERVICE_TAX

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}

@Entity('expense_claims')
export class ExpenseClaim extends TenantBaseEntity {
  @Column({ name: 'employee_id', type: 'uuid', nullable: true })
  employeeId: string | null;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  category: string; // travel, meals, accommodation, tools, other

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId: string | null;

  @Column({ name: 'receipt_url', type: 'varchar', nullable: true })
  receiptUrl: string | null;

  @Column({ type: 'varchar', default: 'pending' })
  status: string; // pending | approved | rejected | paid

  @Column({ name: 'approved_by', type: 'uuid', nullable: true })
  approvedBy: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
