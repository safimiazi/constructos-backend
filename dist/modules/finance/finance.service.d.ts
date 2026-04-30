import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { Budget } from './entities/budget.entity';
import { BankAccount } from './entities/bank-account.entity';
import { ChartOfAccount, JournalEntry, InvoicePayment } from './entities/journal.entity';
import { TaxRate, ExpenseClaim } from './entities/tax.entity';
import { BankTransaction } from './entities/bank-transaction.entity';
export declare class FinanceService {
    private invoiceRepo;
    private budgetRepo;
    private bankRepo;
    private coaRepo;
    private journalRepo;
    private paymentRepo;
    private taxRepo;
    private expenseRepo;
    private txRepo;
    constructor(invoiceRepo: Repository<Invoice>, budgetRepo: Repository<Budget>, bankRepo: Repository<BankAccount>, coaRepo: Repository<ChartOfAccount>, journalRepo: Repository<JournalEntry>, paymentRepo: Repository<InvoicePayment>, taxRepo: Repository<TaxRate>, expenseRepo: Repository<ExpenseClaim>, txRepo: Repository<BankTransaction>);
    findInvoices(tenantId: string, q: {
        status?: string;
        type?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Invoice[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findInvoice(tenantId: string, id: string): Promise<Invoice>;
    createInvoice(tenantId: string, userId: string, dto: Partial<Invoice>): Promise<Invoice>;
    updateInvoice(tenantId: string, id: string, dto: Partial<Invoice>): Promise<Invoice>;
    updateStatus(tenantId: string, id: string, status: InvoiceStatus): Promise<Invoice>;
    recordPayment(tenantId: string, invoiceId: string, userId: string, dto: {
        amount: number;
        method?: string;
        reference?: string;
    }): Promise<InvoicePayment>;
    getInvoicePayments(tenantId: string, invoiceId: string): Promise<InvoicePayment[]>;
    removeInvoice(tenantId: string, id: string): Promise<void>;
    getDashboardStats(tenantId: string): Promise<{
        totalInvoiced: any;
        totalPaid: any;
        overdueCount: number;
        draftCount: number;
    }>;
    findCOA(tenantId: string): Promise<ChartOfAccount[]>;
    createCOA(tenantId: string, userId: string, dto: Partial<ChartOfAccount>): Promise<ChartOfAccount>;
    findJournals(tenantId: string, q: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: JournalEntry[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createJournal(tenantId: string, userId: string, dto: Partial<JournalEntry>): Promise<JournalEntry>;
    postJournal(tenantId: string, id: string): Promise<JournalEntry | null>;
    findBudgets(tenantId: string, projectId: string): Promise<Budget[]>;
    createBudget(tenantId: string, userId: string, dto: Partial<Budget>): Promise<Budget>;
    updateBudget(tenantId: string, id: string, dto: Partial<Budget>): Promise<Budget | null>;
    removeBudget(tenantId: string, id: string): Promise<void>;
    getBudgetSummary(tenantId: string, projectId: string): Promise<{
        totalBudget: number;
        totalActual: number;
        variance: number;
    }>;
    findBankAccounts(tenantId: string): Promise<BankAccount[]>;
    createBankAccount(tenantId: string, userId: string, dto: Partial<BankAccount>): Promise<BankAccount>;
    updateBankAccount(tenantId: string, id: string, dto: Partial<BankAccount>): Promise<BankAccount | null>;
    findTransactions(tenantId: string, bankAccountId: string): Promise<BankTransaction[]>;
    createTransaction(tenantId: string, userId: string, dto: Partial<BankTransaction>): Promise<BankTransaction>;
    reconcileTransaction(tenantId: string, txId: string, invoiceId?: string): Promise<BankTransaction | null>;
    getReconciliationSummary(tenantId: string, bankAccountId: string): Promise<any>;
    findTaxRates(tenantId: string): Promise<TaxRate[]>;
    createTaxRate(tenantId: string, userId: string, dto: Partial<TaxRate>): Promise<TaxRate>;
    updateTaxRate(tenantId: string, id: string, dto: Partial<TaxRate>): Promise<TaxRate | null>;
    findExpenses(tenantId: string, q: {
        employeeId?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: ExpenseClaim[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createExpense(tenantId: string, userId: string, dto: Partial<ExpenseClaim>): Promise<ExpenseClaim>;
    approveExpense(tenantId: string, id: string, approverId: string): Promise<ExpenseClaim | null>;
    rejectExpense(tenantId: string, id: string): Promise<ExpenseClaim | null>;
    getPLReport(tenantId: string, startDate: string, endDate: string): Promise<{
        period: {
            startDate: string;
            endDate: string;
        };
        totalIncome: number;
        totalExpense: number;
        netProfit: number;
        margin: number;
        breakdown: {
            clientInvoices: number;
            vendorInvoices: number;
            expenseClaims: number;
        };
    }>;
    getCashflowReport(tenantId: string): Promise<{
        inflow: number;
        outflow: number;
        net: number;
        breakdown: {
            clientPayments: number;
            vendorPayments: number;
            expenseClaims: number;
        };
    }>;
    getBalanceSheet(tenantId: string): Promise<{
        assets: {
            cash: number;
            receivables: number;
            total: number;
        };
        liabilities: {
            payables: number;
            total: number;
        };
        equity: number;
    }>;
}
