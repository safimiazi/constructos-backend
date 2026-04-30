import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('branches')
export class Branch extends TenantBaseEntity {
  @Column({ length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ name: 'is_hq', default: false })
  isHQ: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
