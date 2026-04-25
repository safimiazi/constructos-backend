import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('custom_roles')
export class CustomRole extends TenantBaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'jsonb', default: '{}' })
  permissions: Record<string, boolean>; // { 'projects:read': true, 'finance:write': false, ... }

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
