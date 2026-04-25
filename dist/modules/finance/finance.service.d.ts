import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { Budget } from './entities/budget.entity';
import { BankAccount } from './entities/bank-account.entity';
import { ChartOfAccount, JournalEntry, InvoicePayment } from './entities/journal.entity';
export declare class FinanceService {
    private invoiceRepo;
    private budgetRepo;
    private bankRepo;
    private coaRepo;
    private journalRepo;
    private paymentRepo;
    constructor(invoiceRepo: Repository<Invoice>, budgetRepo: Repository<Budget>, bankRepo: Repository<BankAccount>, coaRepo: Repository<ChartOfAccount>, journalRepo: Repository<JournalEntry>, paymentRepo: Repository<InvoicePayment>);
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
    removeInvoice(tenantId: string, id: string): Promise<void>;
    recordPayment(tenantId: string, invoiceId: string, userId: string, dto: {
        amount: number;
        method?: string;
        reference?: string;
    }): Promise<InvoicePayment>;
    getInvoicePayments(tenantId: string, invoiceId: string): Promise<InvoicePayment[]>;
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
    getBudgetSummary(tenantId: string, projectId: string): Promise<any>;
    findBankAccounts(tenantId: string): Promise<BankAccount[]>;
    createBankAccount(tenantId: string, userId: string, dto: Partial<BankAccount>): Promise<BankAccount>;
    updateBankAccount(tenantId: string, id: string, dto: Partial<BankAccount>): Promise<BankAccount | null>;
    getPLReport(tenantId: string, startDate: string, endDate: string): Promise<{
        period: {
            startDate: string;
            endDate: string;
        };
        totalIncome: number;
        totalExpense: number;
        netProfit: number;
    }>;
    getCashflowReport(tenantId: string): Promise<{
        inflow: number;
        outflow: number;
        net: number;
    }>;
}
