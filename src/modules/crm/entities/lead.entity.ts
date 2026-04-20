import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum LeadStage { NEW = 'new', QUALIFIED = 'qualified', PROPOSAL = 'proposal', NEGOTIATION = 'negotiation', WON = 'won', LOST = 'lost' }

@Entity('leads')
export class Lead extends TenantBaseEntity {
  @Column({ length: 200 })
  name: string;

  @Column({ type: 'jsonb', default: '{}' })
  contactInfo: { email?: string; phone?: string; company?: string };

  @Column({ type: 'varchar', nullable: true })
  source: string | null;

  @Column({ name: 'assigned_to', type: 'uuid', nullable: true })
  assignedTo: string | null;

  @Column({ type: 'enum', enum: LeadStage, default: LeadStage.NEW })
  stage: LeadStage;

  @Column({ name: 'expected_value', type: 'numeric', precision: 15, scale: 2, default: 0 })
  expectedValue: number;

  @Column({ name: 'expected_close_date', type: 'date', nullable: true })
  expectedCloseDate: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
