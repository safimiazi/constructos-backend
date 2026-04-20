import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum IncidentType { ACCIDENT = 'accident', NEAR_MISS = 'near_miss', PROPERTY_DAMAGE = 'property_damage' }
export enum IncidentSeverity { LOW = 'low', MEDIUM = 'medium', HIGH = 'high', CRITICAL = 'critical' }
export enum IncidentStatus { OPEN = 'open', INVESTIGATING = 'investigating', CLOSED = 'closed' }

@Entity('safety_incidents')
export class Incident extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ name: 'incident_date', type: 'date' })
  incidentDate: Date;

  @Column({ type: 'enum', enum: IncidentType })
  type: IncidentType;

  @Column({ type: 'enum', enum: IncidentSeverity })
  severity: IncidentSeverity;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'injured_person', type: 'varchar', nullable: true })
  injuredPerson: string | null;

  @Column({ name: 'root_cause', type: 'text', nullable: true })
  rootCause: string | null;

  @Column({ name: 'corrective_actions', type: 'jsonb', default: '[]' })
  correctiveActions: string[];

  @Column({ type: 'jsonb', default: '[]' })
  photos: string[];

  @Column({ type: 'enum', enum: IncidentStatus, default: IncidentStatus.OPEN })
  status: IncidentStatus;
}
