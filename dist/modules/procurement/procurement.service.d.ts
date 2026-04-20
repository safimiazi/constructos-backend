import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { MaterialRequest } from './entities/material-request.entity';
import { Inventory } from './entities/inventory.entity';
export declare class ProcurementService {
    private vendorRepo;
    private poRepo;
    private mrRepo;
    private invRepo;
    constructor(vendorRepo: Repository<Vendor>, poRepo: Repository<PurchaseOrder>, mrRepo: Repository<MaterialRequest>, invRepo: Repository<Inventory>);
    findVendors(tenantId: string, q: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Vendor[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findVendor(tenantId: string, id: string): Promise<Vendor>;
    createVendor(tenantId: string, userId: string, dto: Partial<Vendor>): Promise<Vendor>;
    updateVendor(tenantId: string, id: string, dto: Partial<Vendor>): Promise<Vendor>;
    removeVendor(tenantId: string, id: string): Promise<void>;
    findPOs(tenantId: string, q: {
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: PurchaseOrder[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findPO(tenantId: string, id: string): Promise<PurchaseOrder>;
    createPO(tenantId: string, userId: string, dto: Partial<PurchaseOrder>): Promise<PurchaseOrder>;
    updatePO(tenantId: string, id: string, dto: Partial<PurchaseOrder>): Promise<PurchaseOrder>;
    removePO(tenantId: string, id: string): Promise<void>;
    findMRs(tenantId: string, q: {
        projectId?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: MaterialRequest[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createMR(tenantId: string, userId: string, dto: Partial<MaterialRequest>): Promise<MaterialRequest>;
    approveMR(tenantId: string, id: string, approverId: string): Promise<MaterialRequest | null>;
    rejectMR(tenantId: string, id: string): Promise<MaterialRequest | null>;
    findInventory(tenantId: string, q: {
        search?: string;
        lowStock?: boolean;
    }): Promise<Inventory[]>;
    createInventoryItem(tenantId: string, userId: string, dto: Partial<Inventory>): Promise<Inventory>;
    updateInventoryItem(tenantId: string, id: string, dto: Partial<Inventory>): Promise<Inventory | null>;
}
