import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum MatchStatus { PENDING = 'pending', MATCHED = 'matched', DISCREPANCY = 'discrepancy' }

@Entity('three_way_matches')
export class ThreeWayMatch extends TenantBaseEntity {
  @Column({ name: 'po_id', type: 'uuid' })
  poId: string;

  @Column({ name: 'grn_id', type: 'uuid' })
  grnId: string;

  @Column({ name: 'invoice_id', type: 'uuid' })
  invoiceId: string;

  @Column({ type: 'enum', enum: MatchStatus, default: MatchStatus.PENDING })
  status: MatchStatus;

  @Column({ name: 'po_amount', type: 'numeric', precision: 15, scale: 2 })
  poAmount: number;

  @Column({ name: 'grn_amount', type: 'numeric', precision: 15, scale: 2 })
  grnAmount: number;

  @Column({ name: 'invoice_amount', type: 'numeric', precision: 15, scale: 2 })
  invoiceAmount: number;

  @Column({ name: 'discrepancy_notes', type: 'text', nullable: true })
  discrepancyNotes: string | null;
}
