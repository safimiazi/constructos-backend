import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('budgets')
export class Budget extends TenantBaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ type: 'varchar', nullable: true })
  phase: string | null;

  @Column({ name: 'cost_code', type: 'varchar', nullable: true })
  costCode: string | null;

  @Column({ length: 200 })
  description: string;

  @Column({ name: 'budget_amount', type: 'numeric', precision: 15, scale: 2 })
  budgetAmount: number;

  @Column({ name: 'actual_amount', type: 'numeric', precision: 15, scale: 2, default: 0 })
  actualAmount: number;
}
