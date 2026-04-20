import { ProcurementService } from './procurement.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class ProcurementController {
    private readonly svc;
    constructor(svc: ProcurementService);
    findVendors(u: JwtPayload, q: any): Promise<{
        data: import("./entities/vendor.entity").Vendor[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createVendor(u: JwtPayload, dto: any): Promise<import("./entities/vendor.entity").Vendor>;
    findVendor(u: JwtPayload, id: string): Promise<import("./entities/vendor.entity").Vendor>;
    updateVendor(u: JwtPayload, id: string, dto: any): Promise<import("./entities/vendor.entity").Vendor>;
    removeVendor(u: JwtPayload, id: string): Promise<void>;
    findPOs(u: JwtPayload, q: any): Promise<{
        data: import("./entities/purchase-order.entity").PurchaseOrder[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createPO(u: JwtPayload, dto: any): Promise<import("./entities/purchase-order.entity").PurchaseOrder>;
    findPO(u: JwtPayload, id: string): Promise<import("./entities/purchase-order.entity").PurchaseOrder>;
    updatePO(u: JwtPayload, id: string, dto: any): Promise<import("./entities/purchase-order.entity").PurchaseOrder>;
    removePO(u: JwtPayload, id: string): Promise<void>;
    findMRs(u: JwtPayload, q: any): Promise<{
        data: import("./entities/material-request.entity").MaterialRequest[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createMR(u: JwtPayload, dto: any): Promise<import("./entities/material-request.entity").MaterialRequest>;
    approveMR(u: JwtPayload, id: string): Promise<import("./entities/material-request.entity").MaterialRequest | null>;
    rejectMR(u: JwtPayload, id: string): Promise<import("./entities/material-request.entity").MaterialRequest | null>;
    findInventory(u: JwtPayload, q: any): Promise<import("./entities/inventory.entity").Inventory[]>;
    createItem(u: JwtPayload, dto: any): Promise<import("./entities/inventory.entity").Inventory>;
    updateItem(u: JwtPayload, id: string, dto: any): Promise<import("./entities/inventory.entity").Inventory | null>;
}
