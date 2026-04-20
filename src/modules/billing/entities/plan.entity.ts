import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { PlanTier } from '../../../common/interfaces/jwt-payload.interface';

@Entity('plans')
export class Plan extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: PlanTier })
  tier: PlanTier;

  @Column({ name: 'price_monthly', type: 'numeric', precision: 10, scale: 2 })
  priceMonthly: number;

  @Column({ name: 'price_annual', type: 'numeric', precision: 10, scale: 2 })
  priceAnnual: number;

  @Column({ name: 'max_users', type: 'int', nullable: true })
  maxUsers: number | null; // null = unlimited

  @Column({ name: 'max_projects', type: 'int', nullable: true })
  maxProjects: number | null;

  @Column({ name: 'storage_gb', type: 'int' })
  storageGb: number;

  @Column({ type: 'jsonb', default: '{}' })
  features: Record<string, boolean>; // { crm: true, hse: false, ... }

  @Column({ default: true })
  isActive: boolean;
}
