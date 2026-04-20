import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

@Entity('inventory')
export class Inventory extends TenantBaseEntity {
  @Column({ name: 'material_name', length: 200 })
  materialName: string;

  @Column({ length: 50 })
  unit: string;

  @Column({ name: 'qty_in_hand', type: 'numeric', precision: 12, scale: 2, default: 0 })
  qtyInHand: number;

  @Column({ name: 'reorder_level', type: 'numeric', precision: 12, scale: 2, default: 0 })
  reorderLevel: number;

  @Column({ name: 'location', type: 'varchar', nullable: true })
  location: string | null;

  @Column({ name: 'unit_cost', type: 'numeric', precision: 12, scale: 2, default: 0 })
  unitCost: number;
}
