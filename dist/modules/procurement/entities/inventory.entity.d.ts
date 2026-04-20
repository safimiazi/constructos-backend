import { TenantBaseEntity } from '../../../database/base.entity';
export declare class Inventory extends TenantBaseEntity {
    materialName: string;
    unit: string;
    qtyInHand: number;
    reorderLevel: number;
    location: string | null;
    unitCost: number;
}
