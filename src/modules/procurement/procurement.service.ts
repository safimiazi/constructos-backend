import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { MaterialRequest, MRStatus } from './entities/material-request.entity';
import { Inventory } from './entities/inventory.entity';
import { RFQ, RFQStatus, GRN } from './entities/rfq.entity';
import { ThreeWayMatch, MatchStatus } from './entities/three-way-match.entity';

@Injectable()
export class ProcurementService {
  constructor(
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
    @InjectRepository(PurchaseOrder) private poRepo: Repository<PurchaseOrder>,
    @InjectRepository(MaterialRequest) private mrRepo: Repository<MaterialRequest>,
    @InjectRepository(Inventory) private invRepo: Repository<Inventory>,
    @InjectRepository(RFQ) private rfqRepo: Repository<RFQ>,
    @InjectRepository(GRN) private grnRepo: Repository<GRN>,
    @InjectRepository(ThreeWayMatch) private matchRepo: Repository<ThreeWayMatch>,
  ) {}

  // Vendors
  findVendors(tenantId: string, q: { search?: string; page?: number; limit?: number }) {
    const { search, page = 1, limit = 20 } = q;
    const qb = this.vendorRepo.createQueryBuilder('v').where('v.tenant_id = :tenantId AND v.deleted_at IS NULL', { tenantId }).orderBy('v.name', 'ASC').skip((page - 1) * limit).take(limit);
    if (search) qb.andWhere('v.name ILIKE :s', { s: `%${search}%` });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findVendor(tenantId: string, id: string) {
    const v = await this.vendorRepo.findOne({ where: { id, tenantId } });
    if (!v) throw new NotFoundException('Vendor not found');
    return v;
  }

  createVendor(tenantId: string, userId: string, dto: Partial<Vendor>) { return this.vendorRepo.save(this.vendorRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async updateVendor(tenantId: string, id: string, dto: Partial<Vendor>) { await this.findVendor(tenantId, id); await this.vendorRepo.update({ id, tenantId }, dto); return this.findVendor(tenantId, id); }
  async removeVendor(tenantId: string, id: string) { await this.findVendor(tenantId, id); await this.vendorRepo.softDelete({ id, tenantId }); }

  // Purchase Orders
  findPOs(tenantId: string, q: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 20 } = q;
    const qb = this.poRepo.createQueryBuilder('p').where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId }).orderBy('p.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (status) qb.andWhere('p.status = :status', { status });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findPO(tenantId: string, id: string) {
    const po = await this.poRepo.findOne({ where: { id, tenantId } });
    if (!po) throw new NotFoundException('Purchase order not found');
    return po;
  }

  async createPO(tenantId: string, userId: string, dto: Partial<PurchaseOrder>) {
    const count = await this.poRepo.count({ where: { tenantId } });
    const poNumber = `PO-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    return this.poRepo.save(this.poRepo.create({ ...dto, tenantId, poNumber, createdBy: userId }));
  }

  async updatePO(tenantId: string, id: string, dto: Partial<PurchaseOrder>) { await this.findPO(tenantId, id); await this.poRepo.update({ id, tenantId }, dto); return this.findPO(tenantId, id); }
  async removePO(tenantId: string, id: string) { await this.findPO(tenantId, id); await this.poRepo.softDelete({ id, tenantId }); }

  // Material Requests
  findMRs(tenantId: string, q: { projectId?: string; status?: string; page?: number; limit?: number }) {
    const { projectId, status, page = 1, limit = 20 } = q;
    const qb = this.mrRepo.createQueryBuilder('m').where('m.tenant_id = :tenantId AND m.deleted_at IS NULL', { tenantId }).orderBy('m.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (projectId) qb.andWhere('m.project_id = :projectId', { projectId });
    if (status) qb.andWhere('m.status = :status', { status });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  createMR(tenantId: string, userId: string, dto: Partial<MaterialRequest>) { return this.mrRepo.save(this.mrRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async approveMR(tenantId: string, id: string, approverId: string) { await this.mrRepo.update({ id, tenantId }, { status: MRStatus.APPROVED, approvedBy: approverId }); return this.mrRepo.findOne({ where: { id, tenantId } }); }
  async rejectMR(tenantId: string, id: string) { await this.mrRepo.update({ id, tenantId }, { status: MRStatus.REJECTED }); return this.mrRepo.findOne({ where: { id, tenantId } }); }

  // RFQs
  findRFQs(tenantId: string) { return this.rfqRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' } }); }

  async createRFQ(tenantId: string, userId: string, dto: Partial<RFQ>) {
    const count = await this.rfqRepo.count({ where: { tenantId } });
    const rfqNumber = `RFQ-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    return this.rfqRepo.save(this.rfqRepo.create({ ...dto, tenantId, rfqNumber, createdBy: userId }));
  }

  async awardRFQ(tenantId: string, id: string, vendorId: string) {
    await this.rfqRepo.update({ id, tenantId }, { status: RFQStatus.AWARDED, awardedVendorId: vendorId });
    return this.rfqRepo.findOne({ where: { id, tenantId } });
  }

  // GRN
  findGRNs(tenantId: string, poId?: string) {
    const where: any = { tenantId };
    if (poId) where.poId = poId;
    return this.grnRepo.find({ where, order: { receivedAt: 'DESC' } });
  }

  createGRN(tenantId: string, userId: string, dto: Partial<GRN>) { return this.grnRepo.save(this.grnRepo.create({ ...dto, tenantId, createdBy: userId })); }

  // Inventory
  findInventory(tenantId: string, q: { search?: string; lowStock?: boolean }) {
    const qb = this.invRepo.createQueryBuilder('i').where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId }).orderBy('i.material_name', 'ASC');
    if (q.search) qb.andWhere('i.material_name ILIKE :s', { s: `%${q.search}%` });
    if (q.lowStock) qb.andWhere('i.qty_in_hand <= i.reorder_level');
    return qb.getMany();
  }

  createInventoryItem(tenantId: string, userId: string, dto: Partial<Inventory>) { return this.invRepo.save(this.invRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async updateInventoryItem(tenantId: string, id: string, dto: Partial<Inventory>) { await this.invRepo.update({ id, tenantId }, dto); return this.invRepo.findOne({ where: { id, tenantId } }); }

  async transferStock(tenantId: string, id: string, qty: number, toLocation: string) {
    const item = await this.invRepo.findOne({ where: { id, tenantId } });
    if (!item) throw new NotFoundException('Inventory item not found');
    await this.invRepo.update({ id, tenantId }, { qtyInHand: Number(item.qtyInHand) - qty, location: toLocation });
    return this.invRepo.findOne({ where: { id, tenantId } });
  }

  // 3-Way Match
  async createThreeWayMatch(tenantId: string, userId: string, dto: { poId: string; grnId: string; invoiceId: string }) {
    const po = await this.poRepo.findOne({ where: { id: dto.poId, tenantId } });
    const grn = await this.grnRepo.findOne({ where: { id: dto.grnId, tenantId } });
    if (!po || !grn) throw new NotFoundException('PO or GRN not found');
    const poAmount = Number(po.totalCost);
    // Calculate GRN amount using actual unit prices from PO items
    const poItems: any[] = po.items ?? [];
    const grnAmount = grn.items.reduce((s: number, gi: any) => {
      const poItem = poItems.find((pi: any) => pi.description === gi.description || pi.itemCode === gi.itemCode);
      const unitCost = poItem ? Number(poItem.unitCost) : (poAmount / Math.max(poItems.length, 1));
      return s + (Number(gi.qtyAccepted) * unitCost);
    }, 0);
    const invoiceAmount = dto.invoiceId ? poAmount : 0; // invoice amount defaults to PO amount if not fetched
    const tolerance = 0.05; // 5% tolerance
    const poGrnDiff = Math.abs(poAmount - grnAmount) / Math.max(poAmount, 1);
    const status = poGrnDiff <= tolerance ? MatchStatus.MATCHED : MatchStatus.DISCREPANCY;
    const discrepancyNotes = status === MatchStatus.DISCREPANCY
      ? `PO: ৳${poAmount.toFixed(2)}, GRN: ৳${grnAmount.toFixed(2)}, Diff: ${(poGrnDiff * 100).toFixed(1)}%`
      : null;
    return this.matchRepo.save(this.matchRepo.create({ ...dto, tenantId, poAmount, grnAmount, invoiceAmount, status, discrepancyNotes, createdBy: userId }));
  }

  findMatches(tenantId: string) { return this.matchRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' } }); }

  getSpendAnalytics(tenantId: string) {
    return this.poRepo.createQueryBuilder('p')
      .leftJoin('vendors', 'v', 'v.id = p.vendor_id')
      .select('p.vendor_id', 'vendorId')
      .addSelect('COALESCE(v.name, p.vendor_id)', 'vendorName')
      .addSelect('SUM(p.total_cost)', 'totalSpend')
      .addSelect('COUNT(*)', 'poCount')
      .where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId })
      .groupBy('p.vendor_id').addGroupBy('v.name')
      .orderBy('SUM(p.total_cost)', 'DESC').limit(10).getRawMany();
  }
}
