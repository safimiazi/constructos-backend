import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum ClientType { INDIVIDUAL = 'individual', COMPANY = 'company' }

@Entity('clients')
export class Client extends TenantBaseEntity {
  @Column({ length: 200 })
  name: string;

  @Column({ type: 'enum', enum: ClientType, default: ClientType.COMPANY })
  type: ClientType;

  @Column({ name: 'contact_person', type: 'varchar', nullable: true })
  contactPerson: string | null;

  @Column({ type: 'varchar', nullable: true })
  email: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @Column({ type: 'varchar', nullable: true })
  source: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
