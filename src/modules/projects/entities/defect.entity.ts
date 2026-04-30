import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum DefectStatus { OPEN = 'open', IN_PROGRESS = 'in_progress', RESOLVED = 'resolved', CLOSED = 'closed' }
export enum DefectSeverity { LOW = 'low', MEDIUM = 'medium', HIGH = 'high', CRITICAL = 'critical' }

@Entity('defects')
export class Defect extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  location: string | null;

  @Column({ type: 'enum', enum: DefectSeverity, default: DefectSeverity.MEDIUM })
  severity: DefectSeverity;

  @Column({ type: 'enum', enum: DefectStatus, default: DefectStatus.OPEN })
  status: DefectStatus;

  @Column({ name: 'assigned_to', type: 'uuid', nullable: true })
  assignedTo: string | null;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate: Date | null;

  @Column({ name: 'resolved_at', type: 'timestamptz', nullable: true })
  resolvedAt: Date | null;
}
