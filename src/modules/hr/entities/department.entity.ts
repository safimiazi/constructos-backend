import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('departments')
export class Department extends TenantBaseEntity {
  @Column({ length: 200 })
  name: string;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId: string | null;

  @Column({ name: 'head_user_id', type: 'uuid', nullable: true })
  headUserId: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
