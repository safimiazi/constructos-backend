import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('bank_accounts')
export class BankAccount extends TenantBaseEntity {
  @Column({ length: 200 })
  name: string;

  @Column({ name: 'account_no', length: 50 })
  accountNo: string;

  @Column({ name: 'bank_name', length: 200 })
  bankName: string;

  @Column({ length: 3, default: 'BDT' })
  currency: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
