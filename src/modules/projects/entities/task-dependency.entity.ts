import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum DependencyType { FS = 'FS', SS = 'SS', FF = 'FF', SF = 'SF' }

@Entity('task_dependencies')
export class TaskDependency extends TenantBaseEntity {
  @Column({ name: 'task_id', type: 'uuid' })
  taskId: string;

  @Column({ name: 'depends_on_task_id', type: 'uuid' })
  dependsOnTaskId: string;

  @Column({ type: 'enum', enum: DependencyType, default: DependencyType.FS })
  type: DependencyType;

  @Column({ name: 'lag_days', type: 'int', default: 0 })
  lagDays: number;
}
