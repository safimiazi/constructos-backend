import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum RiskStatus { OPEN = 'open', MITIGATED = 'mitigated', CLOSED = 'closed' }
export enum RiskLevel { LOW = 'low', MEDIUM = 'medium', HIGH = 'high', CRITICAL = 'critical' }

@Entity('risks')
export class Risk extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: RiskLevel, name: 'likelihood' })
  likelihood: RiskLevel;

  @Column({ type: 'enum', enum: RiskLevel })
  impact: RiskLevel;

  @Column({ type: 'enum', enum: RiskStatus, default: RiskStatus.OPEN })
  status: RiskStatus;

  @Column({ name: 'mitigation_plan', type: 'text', nullable: true })
  mitigationPlan: string | null;

  @Column({ name: 'owner_id', type: 'uuid', nullable: true })
  ownerId: string | null;
}
