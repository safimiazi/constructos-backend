import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum POStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  APPROVED = 'approved',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}

@Entity('purchase_orders')
export class PurchaseOrder extends TenantBaseEntity {
  @Column({ name: 'po_number', length: 50 })
  poNumber: string;

  @Column({ name: 'vendor_id', type: 'uuid' })
  vendorId: string;

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId: string | null;

  @Column({ type: 'jsonb', default: '[]' })
  items: { description: string; quantity: number; unitCost: number; totalCost: number }[];

  @Column({ name: 'total_cost', type: 'numeric', precision: 15, scale: 2 })
  totalCost: number;

  @Column({ type: 'enum', enum: POStatus, default: POStatus.DRAFT })
  status: POStatus;

  @Column({ name: 'expected_date', type: 'date', nullable: true })
  expectedDate: Date | null;

  @Column({ name: 'received_date', type: 'date', nullable: true })
  receivedDate: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
