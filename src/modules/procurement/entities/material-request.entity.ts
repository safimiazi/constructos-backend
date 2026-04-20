import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum MRStatus { PENDING = 'pending', APPROVED = 'approved', ORDERED = 'ordered', REJECTED = 'rejected' }

@Entity('material_requests')
export class MaterialRequest extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ name: 'task_id', type: 'uuid', nullable: true })
  taskId: string | null;

  @Column({ type: 'enum', enum: MRStatus, default: MRStatus.PENDING })
  status: MRStatus;

  @Column({ type: 'jsonb', default: '[]' })
  items: { name: string; qty: number; unit: string; estimatedCost: number }[];

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'needed_by', type: 'date', nullable: true })
  neededBy: Date | null;

  @Column({ name: 'approved_by', type: 'uuid', nullable: true })
  approvedBy: string | null;
}
