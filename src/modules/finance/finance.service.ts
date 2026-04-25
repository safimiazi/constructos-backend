import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { Budget } from './entities/budget.entity';
import { BankAccount } from './entities/bank-account.entity';
import { ChartOfAccount, JournalEntry, InvoicePayment } from './entities/journal.entity';
import { TaxRate, ExpenseClaim } from './entities/tax.entity';
import { BankTransaction } from './entities/bank-transaction.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Budget) private budgetRepo: Repository<Budget>,
    @InjectRepository(BankAccount) private bankRepo: Repository<BankAccount>,
    @InjectRepository(ChartOfAccount) private coaRepo: Repository<ChartOfAccount>,
    @InjectRepository(JournalEntry) private journalRepo: Repository<JournalEntry>,
    @InjectRepository(InvoicePayment) private paymentRepo: Repository<InvoicePayment>,
    @InjectRepository(TaxRate) private taxRepo: Repository<TaxRate>,
    @InjectRepository(ExpenseClaim) private expenseRepo: Repository<ExpenseClaim>,
    @InjectRepository(BankTransaction) private txRepo: Repository<BankTransaction>,
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

  async recordPayment(tenantId: string, invoiceId: string, userId: string, dto: { amount: number; method?: string; reference?: string }) {
    const inv = await this.findInvoice(tenantId, invoiceId);
    const remaining = Number(inv.totalAmount) - Number(inv.paidAmount);
    if (dto.amount <= 0) throw new BadRequestException('Payment amount must be positive');
    if (dto.amount > remaining + 0.01) throw new BadRequestException(`Payment (${dto.amount}) exceeds remaining balance (${remaining.toFixed(2)})`);
    const payment = await this.paymentRepo.save(this.paymentRepo.create({ invoiceId, amount: dto.amount, method: dto.method, reference: dto.reference, paidAt: new Date(), tenantId, createdBy: userId }));
    const newPaid = Number(inv.paidAmount) + Number(dto.amount);
    const newStatus = newPaid >= Number(inv.totalAmount) - 0.01 ? InvoiceStatus.PAID : inv.status;
    await this.invoiceRepo.update({ id: invoiceId }, { paidAmount: newPaid, status: newStatus });
    if (inv.projectId && inv.type === 'vendor') {
      const budgets = await this.budgetRepo.find({ where: { tenantId, projectId: inv.projectId } });
      if (budgets.length > 0) {
        await this.budgetRepo.update({ id: budgets[0].id }, { actualAmount: Number(budgets[0].actualAmount) + Number(dto.amount) });
      }
    }
    return payment;
  }

  getInvoicePayments(tenantId: string, invoiceId: string) {
    return this.paymentRepo.find({ where: { invoiceId, tenantId }, order: { paidAt: 'DESC' } });
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

  // ── COA ────────────────────────────────────────────────────────────────────

  findCOA(tenantId: string) { return this.coaRepo.find({ where: { tenantId, isActive: true }, order: { code: 'ASC' } }); }
  createCOA(tenantId: string, userId: string, dto: Partial<ChartOfAccount>) { return this.coaRepo.save(this.coaRepo.create({ ...dto, tenantId, createdBy: userId })); }

  // ── Journal Entries ────────────────────────────────────────────────────────

  findJournals(tenantId: string, q: { page?: number; limit?: number }) {
    const { page = 1, limit = 20 } = q;
    return this.journalRepo.findAndCount({ where: { tenantId }, order: { entryDate: 'DESC' }, skip: (page - 1) * limit, take: limit })
      .then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  createJournal(tenantId: string, userId: string, dto: Partial<JournalEntry>) { return this.journalRepo.save(this.journalRepo.create({ ...dto, tenantId, createdBy: userId })); }

  async postJournal(tenantId: string, id: string) {
    await this.journalRepo.update({ id, tenantId }, { isPosted: true });
    return this.journalRepo.findOne({ where: { id, tenantId } });
  }

  // ── Budgets ────────────────────────────────────────────────────────────────

  findBudgets(tenantId: string, projectId: string) { return this.budgetRepo.find({ where: { tenantId, projectId }, order: { phase: 'ASC' } }); }
  createBudget(tenantId: string, userId: string, dto: Partial<Budget>) { return this.budgetRepo.save(this.budgetRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async updateBudget(tenantId: string, id: string, dto: Partial<Budget>) { await this.budgetRepo.update({ id, tenantId }, dto); return this.budgetRepo.findOne({ where: { id, tenantId } }); }
  async removeBudget(tenantId: string, id: string) { await this.budgetRepo.softDelete({ id, tenantId }); }

  getBudgetSummary(tenantId: string, projectId: string) {
    return this.budgetRepo.createQueryBuilder('b')
      .select('SUM(b.budget_amount)', 'totalBudget').addSelect('SUM(b.actual_amount)', 'totalActual')
      .where('b.tenant_id = :tenantId AND b.project_id = :projectId AND b.deleted_at IS NULL', { tenantId, projectId })
      .getRawOne()
      .then(r => ({ totalBudget: Number(r?.totalBudget ?? 0), totalActual: Number(r?.totalActual ?? 0), variance: Number(r?.totalBudget ?? 0) - Number(r?.totalActual ?? 0) }));
  }

  // ── Bank Accounts ──────────────────────────────────────────────────────────

  findBankAccounts(tenantId: string) { return this.bankRepo.find({ where: { tenantId, isActive: true }, order: { name: 'ASC' } }); }
  createBankAccount(tenantId: string, userId: string, dto: Partial<BankAccount>) { return this.bankRepo.save(this.bankRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async updateBankAccount(tenantId: string, id: string, dto: Partial<BankAccount>) { await this.bankRepo.update({ id, tenantId }, dto); return this.bankRepo.findOne({ where: { id, tenantId } }); }

  // ── Bank Transactions & Reconciliation ────────────────────────────────────

  findTransactions(tenantId: string, bankAccountId: string) {
    return this.txRepo.find({ where: { tenantId, bankAccountId }, order: { date: 'DESC' } });
  }

  createTransaction(tenantId: string, userId: string, dto: Partial<BankTransaction>) {
    return this.txRepo.save(this.txRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async reconcileTransaction(tenantId: string, txId: string, invoiceId?: string) {
    await this.txRepo.update({ id: txId, tenantId }, { reconciled: true, matchedInvoiceId: invoiceId ?? null });
    return this.txRepo.findOne({ where: { id: txId, tenantId } });
  }

  getReconciliationSummary(tenantId: string, bankAccountId: string) {
    return this.txRepo.createQueryBuilder('t')
      .select('SUM(CASE WHEN t.type = \'credit\' THEN t.amount ELSE 0 END)', 'totalCredits')
      .addSelect('SUM(CASE WHEN t.type = \'debit\' THEN t.amount ELSE 0 END)', 'totalDebits')
      .addSelect('COUNT(CASE WHEN t.reconciled = false THEN 1 END)', 'unreconciled')
      .where('t.tenant_id = :tenantId AND t.bank_account_id = :bankAccountId', { tenantId, bankAccountId })
      .getRawOne();
  }

  // ── Tax Rates ──────────────────────────────────────────────────────────────

  findTaxRates(tenantId: string) { return this.taxRepo.find({ where: { tenantId, isActive: true }, order: { name: 'ASC' } }); }
  createTaxRate(tenantId: string, userId: string, dto: Partial<TaxRate>) { return this.taxRepo.save(this.taxRepo.create({ ...dto, tenantId, createdBy: userId })); }
  async updateTaxRate(tenantId: string, id: string, dto: Partial<TaxRate>) { await this.taxRepo.update({ id, tenantId }, dto); return this.taxRepo.findOne({ where: { id, tenantId } }); }

  // ── Expense Claims ─────────────────────────────────────────────────────────

  findExpenses(tenantId: string, q: { employeeId?: string; status?: string; page?: number; limit?: number }) {
    const { employeeId, status, page = 1, limit = 20 } = q;
    const qb = this.expenseRepo.createQueryBuilder('e')
      .where('e.tenant_id = :tenantId AND e.deleted_at IS NULL', { tenantId })
      .orderBy('e.date', 'DESC').skip((page - 1) * limit).take(limit);
    if (employeeId) qb.andWhere('e.employee_id = :employeeId', { employeeId });
    if (status) qb.andWhere('e.status = :status', { status });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  createExpense(tenantId: string, userId: string, dto: Partial<ExpenseClaim>) { return this.expenseRepo.save(this.expenseRepo.create({ ...dto, tenantId, createdBy: userId })); }

  async approveExpense(tenantId: string, id: string, approverId: string) {
    await this.expenseRepo.update({ id, tenantId }, { status: 'approved', approvedBy: approverId });
    return this.expenseRepo.findOne({ where: { id, tenantId } });
  }

  async rejectExpense(tenantId: string, id: string) {
    await this.expenseRepo.update({ id, tenantId }, { status: 'rejected' });
    return this.expenseRepo.findOne({ where: { id, tenantId } });
  }

  // ── Reports ────────────────────────────────────────────────────────────────

  async getPLReport(tenantId: string, startDate: string, endDate: string) {
    const [income, expense] = await Promise.all([
      this.invoiceRepo.createQueryBuilder('i').select('SUM(i.paid_amount)', 'total')
        .where('i.tenant_id = :tenantId AND i.type = :t AND i.status = :s AND i.issue_date BETWEEN :sd AND :ed AND i.deleted_at IS NULL', { tenantId, t: 'client', s: 'paid', sd: startDate, ed: endDate }).getRawOne(),
      this.invoiceRepo.createQueryBuilder('i').select('SUM(i.paid_amount)', 'total')
        .where('i.tenant_id = :tenantId AND i.type = :t AND i.issue_date BETWEEN :sd AND :ed AND i.deleted_at IS NULL', { tenantId, t: 'vendor', sd: startDate, ed: endDate }).getRawOne(),
    ]);
    const totalIncome = Number(income?.total ?? 0);
    const totalExpense = Number(expense?.total ?? 0);
    return { period: { startDate, endDate }, totalIncome, totalExpense, netProfit: totalIncome - totalExpense, margin: totalIncome > 0 ? Math.round((totalIncome - totalExpense) / totalIncome * 100) : 0 };
  }

  async getCashflowReport(tenantId: string) {
    const [inflow, outflow] = await Promise.all([
      this.invoiceRepo.createQueryBuilder('i').select('SUM(i.paid_amount)', 'total').where('i.tenant_id = :tenantId AND i.type = :t AND i.deleted_at IS NULL', { tenantId, t: 'client' }).getRawOne(),
      this.invoiceRepo.createQueryBuilder('i').select('SUM(i.paid_amount)', 'total').where('i.tenant_id = :tenantId AND i.type = :t AND i.deleted_at IS NULL', { tenantId, t: 'vendor' }).getRawOne(),
    ]);
    const inflowTotal = Number(inflow?.total ?? 0);
    const outflowTotal = Number(outflow?.total ?? 0);
    return { inflow: inflowTotal, outflow: outflowTotal, net: inflowTotal - outflowTotal };
  }

  async getBalanceSheet(tenantId: string) {
    const [bankTotal, invoicedTotal, paidTotal, vendorOwed] = await Promise.all([
      this.bankRepo.createQueryBuilder('b').select('SUM(b.balance)', 'total').where('b.tenant_id = :tenantId', { tenantId }).getRawOne(),
      this.invoiceRepo.createQueryBuilder('i').select('SUM(i.total_amount)', 'total').where('i.tenant_id = :tenantId AND i.type = :t AND i.deleted_at IS NULL', { tenantId, t: 'client' }).getRawOne(),
      this.invoiceRepo.createQueryBuilder('i').select('SUM(i.paid_amount)', 'total').where('i.tenant_id = :tenantId AND i.type = :t AND i.deleted_at IS NULL', { tenantId, t: 'client' }).getRawOne(),
      this.invoiceRepo.createQueryBuilder('i').select('SUM(i.total_amount - i.paid_amount)', 'total').where('i.tenant_id = :tenantId AND i.type = :t AND i.deleted_at IS NULL', { tenantId, t: 'vendor' }).getRawOne(),
    ]);
    const cash = Number(bankTotal?.total ?? 0);
    const receivables = Number(invoicedTotal?.total ?? 0) - Number(paidTotal?.total ?? 0);
    const payables = Number(vendorOwed?.total ?? 0);
    return { assets: { cash, receivables, total: cash + receivables }, liabilities: { payables, total: payables }, equity: cash + receivables - payables };
  }
}
