import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { Budget } from './entities/budget.entity';
import { BankAccount } from './entities/bank-account.entity';
export declare class FinanceService {
    private invoiceRepo;
    private budgetRepo;
    private bankRepo;
    constructor(invoiceRepo: Repository<Invoice>, budgetRepo: Repository<Budget>, bankRepo: Repository<BankAccount>);
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
    getDashboardStats(tenantId: string): Promise<{
        totalInvoiced: any;
        totalPaid: any;
        overdueCount: number;
        draftCount: number;
    }>;
    findBudgets(tenantId: string, projectId: string): Promise<Budget[]>;
    createBudget(tenantId: string, userId: string, dto: Partial<Budget>): Promise<Budget>;
    updateBudget(tenantId: string, id: string, dto: Partial<Budget>): Promise<Budget | null>;
    removeBudget(tenantId: string, id: string): Promise<void>;
    getBudgetSummary(tenantId: string, projectId: string): Promise<any>;
    findBankAccounts(tenantId: string): Promise<BankAccount[]>;
    createBankAccount(tenantId: string, userId: string, dto: Partial<BankAccount>): Promise<BankAccount>;
    updateBankAccount(tenantId: string, id: string, dto: Partial<BankAccount>): Promise<BankAccount | null>;
}
