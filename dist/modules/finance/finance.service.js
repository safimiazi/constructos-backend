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
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
const budget_entity_1 = require("./entities/budget.entity");
const bank_account_entity_1 = require("./entities/bank-account.entity");
const journal_entity_1 = require("./entities/journal.entity");
const tax_entity_1 = require("./entities/tax.entity");
const bank_transaction_entity_1 = require("./entities/bank-transaction.entity");
let FinanceService = class FinanceService {
    invoiceRepo;
    budgetRepo;
    bankRepo;
    coaRepo;
    journalRepo;
    paymentRepo;
    taxRepo;
    expenseRepo;
    txRepo;
    constructor(invoiceRepo, budgetRepo, bankRepo, coaRepo, journalRepo, paymentRepo, taxRepo, expenseRepo, txRepo) {
        this.invoiceRepo = invoiceRepo;
        this.budgetRepo = budgetRepo;
        this.bankRepo = bankRepo;
        this.coaRepo = coaRepo;
        this.journalRepo = journalRepo;
        this.paymentRepo = paymentRepo;
        this.taxRepo = taxRepo;
        this.expenseRepo = expenseRepo;
        this.txRepo = txRepo;
    }
    findInvoices(tenantId, q) {
        const { status, type, page = 1, limit = 20 } = q;
        const qb = this.invoiceRepo.createQueryBuilder('i')
            .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
            .orderBy('i.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        if (status)
            qb.andWhere('i.status = :status', { status });
        if (type)
            qb.andWhere('i.type = :type', { type });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findInvoice(tenantId, id) {
        const inv = await this.invoiceRepo.findOne({ where: { id, tenantId } });
        if (!inv)
            throw new common_1.NotFoundException('Invoice not found');
        return inv;
    }
    async createInvoice(tenantId, userId, dto) {
        if (!dto.issueDate)
            throw new common_1.BadRequestException('Issue date is required');
        if (!dto.dueDate)
            throw new common_1.BadRequestException('Due date is required');
        if (!dto.subtotal && dto.subtotal !== 0)
            throw new common_1.BadRequestException('Subtotal is required');
        if (!dto.totalAmount && dto.totalAmount !== 0)
            throw new common_1.BadRequestException('Total amount is required');
        const count = await this.invoiceRepo.count({ where: { tenantId } });
        const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
        return this.invoiceRepo.save(this.invoiceRepo.create({ ...dto, tenantId, invoiceNumber, createdBy: userId }));
    }
    async updateInvoice(tenantId, id, dto) {
        await this.findInvoice(tenantId, id);
        await this.invoiceRepo.update({ id, tenantId }, dto);
        return this.findInvoice(tenantId, id);
    }
    async updateStatus(tenantId, id, status) {
        await this.invoiceRepo.update({ id, tenantId }, { status });
        return this.findInvoice(tenantId, id);
    }
    async recordPayment(tenantId, invoiceId, userId, dto) {
        const inv = await this.findInvoice(tenantId, invoiceId);
        const remaining = Number(inv.totalAmount) - Number(inv.paidAmount);
        if (dto.amount <= 0)
            throw new common_1.BadRequestException('Payment amount must be positive');
        if (dto.amount > remaining + 0.01)
            throw new common_1.BadRequestException(`Payment (${dto.amount}) exceeds remaining balance (${remaining.toFixed(2)})`);
        const paidAt = dto.paidAt ? new Date(dto.paidAt) : new Date();
        const payment = await this.paymentRepo.save(this.paymentRepo.create({
            invoiceId, amount: dto.amount, method: dto.method,
            reference: dto.reference, notes: dto.notes,
            paidAt, tenantId, createdBy: userId,
        }));
        const newPaid = Number(inv.paidAmount) + Number(dto.amount);
        const newStatus = newPaid >= Number(inv.totalAmount) - 0.01 ? invoice_entity_1.InvoiceStatus.PAID : inv.status;
        await this.invoiceRepo.update({ id: invoiceId }, { paidAmount: newPaid, status: newStatus });
        if (inv.projectId && inv.type === 'vendor') {
            const budgets = await this.budgetRepo.find({ where: { tenantId, projectId: inv.projectId } });
            if (budgets.length > 0) {
                await this.budgetRepo.update({ id: budgets[0].id }, { actualAmount: Number(budgets[0].actualAmount) + Number(dto.amount) });
            }
        }
        return payment;
    }
    getInvoicePayments(tenantId, invoiceId) {
        return this.paymentRepo.find({ where: { invoiceId, tenantId }, order: { paidAt: 'DESC' } });
    }
    async removeInvoice(tenantId, id) {
        await this.findInvoice(tenantId, id);
        await this.invoiceRepo.softDelete({ id, tenantId });
    }
    async getDashboardStats(tenantId) {
        const [total, paid, overdue, draft] = await Promise.all([
            this.invoiceRepo.createQueryBuilder('i').where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId }).select('SUM(i.total_amount)', 'sum').getRawOne(),
            this.invoiceRepo.createQueryBuilder('i').where('i.tenant_id = :tenantId AND i.status = :s AND i.deleted_at IS NULL', { tenantId, s: 'paid' }).select('SUM(i.total_amount)', 'sum').getRawOne(),
            this.invoiceRepo.count({ where: { tenantId, status: invoice_entity_1.InvoiceStatus.OVERDUE } }),
            this.invoiceRepo.count({ where: { tenantId, status: invoice_entity_1.InvoiceStatus.DRAFT } }),
        ]);
        return { totalInvoiced: total?.sum ?? 0, totalPaid: paid?.sum ?? 0, overdueCount: overdue, draftCount: draft };
    }
    findCOA(tenantId) { return this.coaRepo.find({ where: { tenantId, isActive: true }, order: { code: 'ASC' } }); }
    createCOA(tenantId, userId, dto) { return this.coaRepo.save(this.coaRepo.create({ ...dto, tenantId, createdBy: userId })); }
    findJournals(tenantId, q) {
        const { page = 1, limit = 20 } = q;
        return this.journalRepo.findAndCount({ where: { tenantId }, order: { entryDate: 'DESC' }, skip: (page - 1) * limit, take: limit })
            .then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    createJournal(tenantId, userId, dto) { return this.journalRepo.save(this.journalRepo.create({ ...dto, tenantId, createdBy: userId })); }
    async postJournal(tenantId, id) {
        await this.journalRepo.update({ id, tenantId }, { isPosted: true });
        return this.journalRepo.findOne({ where: { id, tenantId } });
    }
    findBudgets(tenantId, projectId) { return this.budgetRepo.find({ where: { tenantId, projectId }, order: { phase: 'ASC' } }); }
    createBudget(tenantId, userId, dto) { return this.budgetRepo.save(this.budgetRepo.create({ ...dto, tenantId, createdBy: userId })); }
    async updateBudget(tenantId, id, dto) { await this.budgetRepo.update({ id, tenantId }, dto); return this.budgetRepo.findOne({ where: { id, tenantId } }); }
    async removeBudget(tenantId, id) { await this.budgetRepo.softDelete({ id, tenantId }); }
    getBudgetSummary(tenantId, projectId) {
        return this.budgetRepo.createQueryBuilder('b')
            .select('SUM(b.budget_amount)', 'totalBudget').addSelect('SUM(b.actual_amount)', 'totalActual')
            .where('b.tenant_id = :tenantId AND b.project_id = :projectId AND b.deleted_at IS NULL', { tenantId, projectId })
            .getRawOne()
            .then(r => ({ totalBudget: Number(r?.totalBudget ?? 0), totalActual: Number(r?.totalActual ?? 0), variance: Number(r?.totalBudget ?? 0) - Number(r?.totalActual ?? 0) }));
    }
    findBankAccounts(tenantId) { return this.bankRepo.find({ where: { tenantId, isActive: true }, order: { name: 'ASC' } }); }
    createBankAccount(tenantId, userId, dto) { return this.bankRepo.save(this.bankRepo.create({ ...dto, tenantId, createdBy: userId })); }
    async updateBankAccount(tenantId, id, dto) { await this.bankRepo.update({ id, tenantId }, dto); return this.bankRepo.findOne({ where: { id, tenantId } }); }
    findTransactions(tenantId, bankAccountId) {
        return this.txRepo.find({ where: { tenantId, bankAccountId }, order: { date: 'DESC' } });
    }
    createTransaction(tenantId, userId, dto) {
        return this.txRepo.save(this.txRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async reconcileTransaction(tenantId, txId, invoiceId) {
        await this.txRepo.update({ id: txId, tenantId }, { reconciled: true, matchedInvoiceId: invoiceId ?? null });
        return this.txRepo.findOne({ where: { id: txId, tenantId } });
    }
    getReconciliationSummary(tenantId, bankAccountId) {
        return this.txRepo.createQueryBuilder('t')
            .select('SUM(CASE WHEN t.type = \'credit\' THEN t.amount ELSE 0 END)', 'totalCredits')
            .addSelect('SUM(CASE WHEN t.type = \'debit\' THEN t.amount ELSE 0 END)', 'totalDebits')
            .addSelect('COUNT(CASE WHEN t.reconciled = false THEN 1 END)', 'unreconciled')
            .where('t.tenant_id = :tenantId AND t.bank_account_id = :bankAccountId', { tenantId, bankAccountId })
            .getRawOne();
    }
    findTaxRates(tenantId) { return this.taxRepo.find({ where: { tenantId, isActive: true }, order: { name: 'ASC' } }); }
    createTaxRate(tenantId, userId, dto) { return this.taxRepo.save(this.taxRepo.create({ ...dto, tenantId, createdBy: userId })); }
    async updateTaxRate(tenantId, id, dto) { await this.taxRepo.update({ id, tenantId }, dto); return this.taxRepo.findOne({ where: { id, tenantId } }); }
    findExpenses(tenantId, q) {
        const { employeeId, status, page = 1, limit = 20 } = q;
        const qb = this.expenseRepo.createQueryBuilder('e')
            .where('e.tenant_id = :tenantId AND e.deleted_at IS NULL', { tenantId })
            .orderBy('e.date', 'DESC').skip((page - 1) * limit).take(limit);
        if (employeeId)
            qb.andWhere('e.employee_id = :employeeId', { employeeId });
        if (status)
            qb.andWhere('e.status = :status', { status });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    createExpense(tenantId, userId, dto) { return this.expenseRepo.save(this.expenseRepo.create({ ...dto, tenantId, createdBy: userId })); }
    async approveExpense(tenantId, id, approverId) {
        await this.expenseRepo.update({ id, tenantId }, { status: 'approved', approvedBy: approverId });
        return this.expenseRepo.findOne({ where: { id, tenantId } });
    }
    async rejectExpense(tenantId, id) {
        await this.expenseRepo.update({ id, tenantId }, { status: 'rejected' });
        return this.expenseRepo.findOne({ where: { id, tenantId } });
    }
    async getPLReport(tenantId, startDate, endDate) {
        const [income, expense, expenseClaims] = await Promise.all([
            this.invoiceRepo.createQueryBuilder('i')
                .select('SUM(i.total_amount)', 'total')
                .where('i.tenant_id = :tenantId AND i.type = :t AND i.status NOT IN (:...excl) AND i.issue_date BETWEEN :sd AND :ed AND i.deleted_at IS NULL', { tenantId, t: 'client', excl: ['cancelled', 'draft'], sd: startDate, ed: endDate })
                .getRawOne(),
            this.invoiceRepo.createQueryBuilder('i')
                .select('SUM(i.total_amount)', 'total')
                .where('i.tenant_id = :tenantId AND i.type = :t AND i.status NOT IN (:...excl) AND i.issue_date BETWEEN :sd AND :ed AND i.deleted_at IS NULL', { tenantId, t: 'vendor', excl: ['cancelled', 'draft'], sd: startDate, ed: endDate })
                .getRawOne(),
            this.expenseRepo.createQueryBuilder('e')
                .select('SUM(e.amount)', 'total')
                .where('e.tenant_id = :tenantId AND e.status = :s AND e.date BETWEEN :sd AND :ed AND e.deleted_at IS NULL', { tenantId, s: 'approved', sd: startDate, ed: endDate })
                .getRawOne(),
        ]);
        const totalIncome = Number(income?.total ?? 0);
        const totalExpense = Number(expense?.total ?? 0) + Number(expenseClaims?.total ?? 0);
        return {
            period: { startDate, endDate },
            totalIncome,
            totalExpense,
            netProfit: totalIncome - totalExpense,
            margin: totalIncome > 0 ? Math.round((totalIncome - totalExpense) / totalIncome * 100) : 0,
            breakdown: {
                clientInvoices: Number(income?.total ?? 0),
                vendorInvoices: Number(expense?.total ?? 0),
                expenseClaims: Number(expenseClaims?.total ?? 0),
            },
        };
    }
    async getCashflowReport(tenantId) {
        const [inflow, outflow, expenses] = await Promise.all([
            this.invoiceRepo.createQueryBuilder('i').select('SUM(i.paid_amount)', 'total')
                .where('i.tenant_id = :tenantId AND i.type = :t AND i.deleted_at IS NULL', { tenantId, t: 'client' }).getRawOne(),
            this.invoiceRepo.createQueryBuilder('i').select('SUM(i.paid_amount)', 'total')
                .where('i.tenant_id = :tenantId AND i.type = :t AND i.deleted_at IS NULL', { tenantId, t: 'vendor' }).getRawOne(),
            this.expenseRepo.createQueryBuilder('e').select('SUM(e.amount)', 'total')
                .where('e.tenant_id = :tenantId AND e.status = :s AND e.deleted_at IS NULL', { tenantId, s: 'approved' }).getRawOne(),
        ]);
        const inflowTotal = Number(inflow?.total ?? 0);
        const outflowTotal = Number(outflow?.total ?? 0) + Number(expenses?.total ?? 0);
        return {
            inflow: inflowTotal,
            outflow: outflowTotal,
            net: inflowTotal - outflowTotal,
            breakdown: {
                clientPayments: inflowTotal,
                vendorPayments: Number(outflow?.total ?? 0),
                expenseClaims: Number(expenses?.total ?? 0),
            },
        };
    }
    async getBalanceSheet(tenantId) {
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
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(1, (0, typeorm_1.InjectRepository)(budget_entity_1.Budget)),
    __param(2, (0, typeorm_1.InjectRepository)(bank_account_entity_1.BankAccount)),
    __param(3, (0, typeorm_1.InjectRepository)(journal_entity_1.ChartOfAccount)),
    __param(4, (0, typeorm_1.InjectRepository)(journal_entity_1.JournalEntry)),
    __param(5, (0, typeorm_1.InjectRepository)(journal_entity_1.InvoicePayment)),
    __param(6, (0, typeorm_1.InjectRepository)(tax_entity_1.TaxRate)),
    __param(7, (0, typeorm_1.InjectRepository)(tax_entity_1.ExpenseClaim)),
    __param(8, (0, typeorm_1.InjectRepository)(bank_transaction_entity_1.BankTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FinanceService);
//# sourceMappingURL=finance.service.js.map