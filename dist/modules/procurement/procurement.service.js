"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcurementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vendor_entity_1 = require("./entities/vendor.entity");
const purchase_order_entity_1 = require("./entities/purchase-order.entity");
const material_request_entity_1 = require("./entities/material-request.entity");
const inventory_entity_1 = require("./entities/inventory.entity");
let ProcurementService = class ProcurementService {
    vendorRepo;
    poRepo;
    mrRepo;
    invRepo;
    constructor(vendorRepo, poRepo, mrRepo, invRepo) {
        this.vendorRepo = vendorRepo;
        this.poRepo = poRepo;
        this.mrRepo = mrRepo;
        this.invRepo = invRepo;
    }
    findVendors(tenantId, q) {
        const { search, page = 1, limit = 20 } = q;
        const qb = this.vendorRepo.createQueryBuilder('v')
            .where('v.tenant_id = :tenantId AND v.deleted_at IS NULL', { tenantId })
            .orderBy('v.name', 'ASC').skip((page - 1) * limit).take(limit);
        if (search)
            qb.andWhere('v.name ILIKE :s', { s: `%${search}%` });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findVendor(tenantId, id) {
        const v = await this.vendorRepo.findOne({ where: { id, tenantId } });
        if (!v)
            throw new common_1.NotFoundException('Vendor not found');
        return v;
    }
    createVendor(tenantId, userId, dto) {
        return this.vendorRepo.save(this.vendorRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateVendor(tenantId, id, dto) {
        await this.findVendor(tenantId, id);
        await this.vendorRepo.update({ id, tenantId }, dto);
        return this.findVendor(tenantId, id);
    }
    async removeVendor(tenantId, id) {
        await this.findVendor(tenantId, id);
        await this.vendorRepo.softDelete({ id, tenantId });
    }
    findPOs(tenantId, q) {
        const { status, page = 1, limit = 20 } = q;
        const qb = this.poRepo.createQueryBuilder('p')
            .where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId })
            .orderBy('p.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        if (status)
            qb.andWhere('p.status = :status', { status });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findPO(tenantId, id) {
        const po = await this.poRepo.findOne({ where: { id, tenantId } });
        if (!po)
            throw new common_1.NotFoundException('Purchase order not found');
        return po;
    }
    async createPO(tenantId, userId, dto) {
        const count = await this.poRepo.count({ where: { tenantId } });
        const poNumber = `PO-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
        return this.poRepo.save(this.poRepo.create({ ...dto, tenantId, poNumber, createdBy: userId }));
    }
    async updatePO(tenantId, id, dto) {
        await this.findPO(tenantId, id);
        await this.poRepo.update({ id, tenantId }, dto);
        return this.findPO(tenantId, id);
    }
    async removePO(tenantId, id) {
        await this.findPO(tenantId, id);
        await this.poRepo.softDelete({ id, tenantId });
    }
    findMRs(tenantId, q) {
        const { projectId, status, page = 1, limit = 20 } = q;
        const qb = this.mrRepo.createQueryBuilder('m')
            .where('m.tenant_id = :tenantId AND m.deleted_at IS NULL', { tenantId })
            .orderBy('m.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        if (projectId)
            qb.andWhere('m.project_id = :projectId', { projectId });
        if (status)
            qb.andWhere('m.status = :status', { status });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    createMR(tenantId, userId, dto) {
        return this.mrRepo.save(this.mrRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async approveMR(tenantId, id, approverId) {
        await this.mrRepo.update({ id, tenantId }, { status: material_request_entity_1.MRStatus.APPROVED, approvedBy: approverId });
        return this.mrRepo.findOne({ where: { id, tenantId } });
    }
    async rejectMR(tenantId, id) {
        await this.mrRepo.update({ id, tenantId }, { status: material_request_entity_1.MRStatus.REJECTED });
        return this.mrRepo.findOne({ where: { id, tenantId } });
    }
    findInventory(tenantId, q) {
        const qb = this.invRepo.createQueryBuilder('i')
            .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
            .orderBy('i.material_name', 'ASC');
        if (q.search)
            qb.andWhere('i.material_name ILIKE :s', { s: `%${q.search}%` });
        if (q.lowStock)
            qb.andWhere('i.qty_in_hand <= i.reorder_level');
        return qb.getMany();
    }
    createInventoryItem(tenantId, userId, dto) {
        return this.invRepo.save(this.invRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateInventoryItem(tenantId, id, dto) {
        await this.invRepo.update({ id, tenantId }, dto);
        return this.invRepo.findOne({ where: { id, tenantId } });
    }
};
exports.ProcurementService = ProcurementService;
exports.ProcurementService = ProcurementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(1, (0, typeorm_1.InjectRepository)(purchase_order_entity_1.PurchaseOrder)),
    __param(2, (0, typeorm_1.InjectRepository)(material_request_entity_1.MaterialRequest)),
    __param(3, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProcurementService);
//# sourceMappingURL=procurement.service.js.map