import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum PTWStatus { PENDING = 'pending', ACTIVE = 'active', CLOSED = 'closed', CANCELLED = 'cancelled' }
export enum PTWType { HOT_WORK = 'hot_work', EXCAVATION = 'excavation', CONFINED_SPACE = 'confined_space', ELECTRICAL = 'electrical', WORKING_AT_HEIGHT = 'working_at_height' }

@Entity('permits_to_work')
export class PermitToWork extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ type: 'enum', enum: PTWType })
  permitType: PTWType;

  @Column({ name: 'issued_to', type: 'varchar' })
  issuedTo: string;

  @Column({ name: 'valid_from', type: 'timestamptz' })
  validFrom: Date;

  @Column({ name: 'valid_until', type: 'timestamptz' })
  validUntil: Date;

  @Column({ type: 'jsonb', default: '[]' })
  conditions: string[];

  @Column({ type: 'enum', enum: PTWStatus, default: PTWStatus.PENDING })
  status: PTWStatus;

  @Column({ name: 'issued_by', type: 'uuid', nullable: true })
  issuedBy: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}

@Entity('safety_checklists')
export class SafetyChecklist extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'jsonb', default: '[]' })
  items: { question: string; answer: boolean | null; notes?: string }[];

  @Column({ name: 'conducted_by', type: 'uuid', nullable: true })
  conductedBy: string | null;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'int', nullable: true })
  score: number | null;

  @Column({ type: 'varchar', default: 'pending' })
  status: string;
}
