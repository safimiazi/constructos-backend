import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ProjectType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  INFRASTRUCTURE = 'infrastructure',
  RENOVATION = 'renovation',
}

@Entity('projects')
export class Project extends TenantBaseEntity {
  @Column({ length: 200 })
  name: string;

  @Column({ type: 'enum', enum: ProjectType })
  type: ProjectType;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ name: 'client_id', type: 'uuid', nullable: true })
  clientId: string | null;

  @Column({ type: 'varchar', nullable: true })
  location: string | null;

  @Column({ name: 'budget_amount', type: 'numeric', precision: 15, scale: 2, default: 0 })
  budgetAmount: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date | null;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.PLANNING })
  status: ProjectStatus;

  @Column({ name: 'project_manager_id', type: 'uuid', nullable: true })
  projectManagerId: string | null;

  @Column({ name: 'completion_percentage', type: 'numeric', precision: 5, scale: 2, default: 0 })
  completionPercentage: number;

  @Column({ name: 'contract_number', type: 'varchar', nullable: true })
  contractNumber: string | null;
}
