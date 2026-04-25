import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('leave_types')
export class LeaveType extends TenantBaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ name: 'annual_entitlement', type: 'numeric', precision: 5, scale: 1, default: 0 })
  annualEntitlement: number;

  @Column({ name: 'is_paid', default: true })
  isPaid: boolean;

  @Column({ name: 'carry_forward', default: false })
  carryForward: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
