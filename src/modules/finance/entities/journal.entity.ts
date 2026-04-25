import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('chart_of_accounts')
export class ChartOfAccount extends TenantBaseEntity {
  @Column({ length: 20 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'varchar' }) // ASSET | LIABILITY | EQUITY | INCOME | EXPENSE
  type: string;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}

@Entity('journal_entries')
export class JournalEntry extends TenantBaseEntity {
  @Column({ name: 'entry_date', type: 'date' })
  entryDate: Date;

  @Column({ type: 'varchar', nullable: true })
  reference: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'is_posted', default: false })
  isPosted: boolean;

  @Column({ type: 'jsonb', default: '[]' })
  lines: { accountId: string; debit: number; credit: number; projectId?: string }[];
}

@Entity('invoice_payments')
export class InvoicePayment extends TenantBaseEntity {
  @Column({ name: 'invoice_id', type: 'uuid' })
  invoiceId: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  amount: number;

  @Column({ name: 'paid_at', type: 'timestamptz' })
  paidAt: Date;

  @Column({ type: 'varchar', nullable: true })
  method: string | null;

  @Column({ type: 'varchar', nullable: true })
  reference: string | null;
}
