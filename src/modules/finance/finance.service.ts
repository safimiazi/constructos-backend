import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { Budget } from './entities/budget.entity';
import { BankAccount } from './entities/bank-account.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Budget) private budgetRepo: Repository<Budget>,
    @InjectRepository(BankAccount) private bankRepo: Repository<BankAccount>,
  ) {}

  // ── Invoices ───────────────────────────────────────────────────────────────

  findInvoices(tenantId: string, q: { status?: string; type?: string; page?: number; limit?: number }) {
    const { status, type, page = 1, limit = 20 } = q;
    const qb = this.invoiceRepo.createQueryBuilder('i')
      .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
      .orderBy('i.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (status) qb.andWhere('i.status = :status', { status });
    if (type) qb.andWhere('i.type = :type', { type });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findInvoice(tenantId: string, id: string) {
    const inv = await this.invoiceRepo.findOne({ where: { id, tenantId } });
    if (!inv) throw new NotFoundException('Invoice not found');
    return inv;
  }

  async createInvoice(tenantId: string, userId: string, dto: Partial<Invoice>) {
    const count = await this.invoiceRepo.count({ where: { tenantId } });
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    return this.invoiceRepo.save(this.invoiceRepo.create({ ...dto, tenantId, invoiceNumber, createdBy: userId }));
  }

  async updateInvoice(tenantId: string, id: string, dto: Partial<Invoice>) {
    await this.findInvoice(tenantId, id);
    await this.invoiceRepo.update({ id, tenantId }, dto);
    return this.findInvoice(tenantId, id);
  }

  async updateStatus(tenantId: string, id: string, status: InvoiceStatus) {
    await this.invoiceRepo.update({ id, tenantId }, { status });
    return this.findInvoice(tenantId, id);
  }

  async removeInvoice(tenantId: string, id: string) {
    await this.findInvoice(tenantId, id);
    await this.invoiceRepo.softDelete({ id, tenantId });
  }

  async getDashboardStats(tenantId: string) {
    const [total, paid, overdue, draft] = await Promise.all([
      this.invoiceRepo.createQueryBuilder('i').where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId }).select('SUM(i.total_amount)', 'sum').getRawOne(),
      this.invoiceRepo.createQueryBuilder('i').where('i.tenant_id = :tenantId AND i.status = :s AND i.deleted_at IS NULL', { tenantId, s: 'paid' }).select('SUM(i.total_amount)', 'sum').getRawOne(),
      this.invoiceRepo.count({ where: { tenantId, status: InvoiceStatus.OVERDUE } }),
      this.invoiceRepo.count({ where: { tenantId, status: InvoiceStatus.DRAFT } }),
    ]);
    return { totalInvoiced: total?.sum ?? 0, totalPaid: paid?.sum ?? 0, overdueCount: overdue, draftCount: draft };
  }

  // ── Budgets ────────────────────────────────────────────────────────────────

  findBudgets(tenantId: string, projectId: string) {
    return this.budgetRepo.find({ where: { tenantId, projectId }, order: { phase: 'ASC' } });
  }

  createBudget(tenantId: string, userId: string, dto: Partial<Budget>) {
    return this.budgetRepo.save(this.budgetRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateBudget(tenantId: string, id: string, dto: Partial<Budget>) {
    await this.budgetRepo.update({ id, tenantId }, dto);
    return this.budgetRepo.findOne({ where: { id, tenantId } });
  }

  async removeBudget(tenantId: string, id: string) {
    await this.budgetRepo.softDelete({ id, tenantId });
  }

  getBudgetSummary(tenantId: string, projectId: string) {
    return this.budgetRepo.createQueryBuilder('b')
      .select('SUM(b.budget_amount)', 'totalBudget')
      .addSelect('SUM(b.actual_amount)', 'totalActual')
      .where('b.tenant_id = :tenantId AND b.project_id = :projectId AND b.deleted_at IS NULL', { tenantId, projectId })
      .getRawOne();
  }

  // ── Bank Accounts ──────────────────────────────────────────────────────────

  findBankAccounts(tenantId: string) {
    return this.bankRepo.find({ where: { tenantId, isActive: true }, order: { name: 'ASC' } });
  }

  createBankAccount(tenantId: string, userId: string, dto: Partial<BankAccount>) {
    return this.bankRepo.save(this.bankRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateBankAccount(tenantId: string, id: string, dto: Partial<BankAccount>) {
    await this.bankRepo.update({ id, tenantId }, dto);
    return this.bankRepo.findOne({ where: { id, tenantId } });
  }
}
