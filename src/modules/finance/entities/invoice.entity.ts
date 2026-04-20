import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

export enum InvoiceType {
  CLIENT = 'client',
  VENDOR = 'vendor',
}

@Entity('invoices')
export class Invoice extends TenantBaseEntity {
  @Column({ name: 'invoice_number', length: 50 })
  invoiceNumber: string;

  @Column({ type: 'enum', enum: InvoiceType, default: InvoiceType.CLIENT })
  type: InvoiceType;

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId: string | null;

  @Column({ name: 'client_id', type: 'uuid', nullable: true })
  clientId: string | null;

  @Column({ name: 'vendor_id', type: 'uuid', nullable: true })
  vendorId: string | null;

  @Column({ type: 'jsonb', default: '[]' })
  items: { description: string; quantity: number; unitPrice: number; amount: number }[];

  @Column({ name: 'subtotal', type: 'numeric', precision: 15, scale: 2 })
  subtotal: number;

  @Column({ name: 'tax_amount', type: 'numeric', precision: 15, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ name: 'total_amount', type: 'numeric', precision: 15, scale: 2 })
  totalAmount: number;

  @Column({ name: 'paid_amount', type: 'numeric', precision: 15, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status: InvoiceStatus;

  @Column({ name: 'issue_date', type: 'date' })
  issueDate: Date;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
