import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('bank_transactions')
export class BankTransaction extends TenantBaseEntity {
  @Column({ name: 'bank_account_id', type: 'uuid' })
  bankAccountId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'varchar' }) // credit | debit
  type: string;

  @Column({ default: false })
  reconciled: boolean;

  @Column({ name: 'reference', type: 'varchar', nullable: true })
  reference: string | null;

  @Column({ name: 'matched_invoice_id', type: 'uuid', nullable: true })
  matchedInvoiceId: string | null;
}
