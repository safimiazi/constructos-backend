import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('daily_logs')
export class DailyLog extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ name: 'task_id', type: 'uuid', nullable: true })
  taskId: string | null;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  workDone: string;

  @Column({ name: 'progress_pct', type: 'numeric', precision: 5, scale: 2, default: 0 })
  progressPct: number;

  @Column({ type: 'text', nullable: true })
  blockers: string | null;

  @Column({ type: 'jsonb', default: '[]' })
  photos: string[];

  @Column({ name: 'weather', type: 'varchar', nullable: true })
  weather: string | null;

  @Column({ name: 'workers_count', type: 'int', default: 0 })
  workersCount: number;
}
