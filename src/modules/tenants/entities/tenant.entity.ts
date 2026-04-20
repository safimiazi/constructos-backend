import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  TRIAL = 'trial',
  CANCELLED = 'cancelled',
}

@Entity('tenants')
export class Tenant extends BaseEntity {
  @Column({ length: 60, unique: true })
  @Index()
  slug: string;

  @Column({ name: 'company_name', length: 200 })
  companyName: string;

  @Column({ name: 'logo_url', type: 'varchar', nullable: true })
  logoUrl: string | null;

  @Column({ name: 'plan_id', type: 'uuid', nullable: true })
  planId: string | null;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.TRIAL,
  })
  status: TenantStatus;

  @Column({ name: 'trial_ends_at', type: 'timestamptz', nullable: true })
  trialEndsAt: Date | null;

  @Column({ default: 'Asia/Dhaka' })
  timezone: string;

  @Column({ default: 'BDT', length: 3 })
  currency: string;

  @Column({ name: 'tax_number', type: 'varchar', nullable: true })
  taxNumber: string | null;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  address: string | null;

  @Column({ name: 'phone', type: 'varchar', nullable: true })
  phone: string | null;
}
