import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum SubcontractStatus { DRAFT = 'draft', ACTIVE = 'active', COMPLETED = 'completed', TERMINATED = 'terminated' }

@Entity('subcontracts')
export class Subcontract extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ name: 'vendor_id', type: 'uuid' })
  vendorId: string;

  @Column({ type: 'text' })
  scope: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  value: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date | null;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @Column({ type: 'enum', enum: SubcontractStatus, default: SubcontractStatus.DRAFT })
  status: SubcontractStatus;

  @Column({ name: 'completion_pct', type: 'numeric', precision: 5, scale: 2, default: 0 })
  completionPct: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
