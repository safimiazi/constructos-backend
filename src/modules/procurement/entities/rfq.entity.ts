import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum RFQStatus { DRAFT = 'draft', SENT = 'sent', AWARDED = 'awarded', CANCELLED = 'cancelled' }

@Entity('rfqs')
export class RFQ extends TenantBaseEntity {
  @Column({ name: 'rfq_number', length: 50 })
  rfqNumber: string;

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId: string | null;

  @Column({ type: 'jsonb', default: '[]' })
  items: { description: string; quantity: number; unit: string }[];

  @Column({ name: 'vendor_ids', type: 'jsonb', default: '[]' })
  vendorIds: string[];

  @Column({ name: 'awarded_vendor_id', type: 'uuid', nullable: true })
  awardedVendorId: string | null;

  @Column({ type: 'enum', enum: RFQStatus, default: RFQStatus.DRAFT })
  status: RFQStatus;

  @Column({ name: 'deadline', type: 'date', nullable: true })
  deadline: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}

@Entity('grn')
export class GRN extends TenantBaseEntity {
  @Column({ name: 'po_id', type: 'uuid' })
  poId: string;

  @Column({ name: 'received_at', type: 'timestamptz' })
  receivedAt: Date;

  @Column({ type: 'varchar' }) // partial | complete
  status: string;

  @Column({ type: 'jsonb', default: '[]' })
  items: { description: string; qtyOrdered: number; qtyReceived: number; qtyAccepted: number; rejectionReason?: string }[];

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
