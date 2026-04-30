import { FinanceService } from './finance.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { InvoiceStatus } from './entities/invoice.entity';
export declare class FinanceController {
    private readonly svc;
    constructor(svc: FinanceService);
    getStats(u: JwtPayload): Promise<{
        totalInvoiced: any;
        totalPaid: any;
        overdueCount: number;
        draftCount: number;
    }>;
    findInvoices(u: JwtPayload, q: any): Promise<{
        data: import("./entities/invoice.entity").Invoice[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createInvoice(u: JwtPayload, dto: any): Promise<import("./entities/invoice.entity").Invoice>;
    findInvoice(u: JwtPayload, id: string): Promise<import("./entities/invoice.entity").Invoice>;
    updateInvoice(u: JwtPayload, id: string, dto: any): Promise<import("./entities/invoice.entity").Invoice>;
    updateStatus(u: JwtPayload, id: string, dto: {
        status: InvoiceStatus;
    }): Promise<import("./entities/invoice.entity").Invoice>;
    recordPayment(u: JwtPayload, id: string, dto: any): Promise<import("./entities/journal.entity").InvoicePayment>;
    getPayments(u: JwtPayload, id: string): Promise<import("./entities/journal.entity").InvoicePayment[]>;
    removeInvoice(u: JwtPayload, id: string): Promise<void>;
    findCOA(u: JwtPayload): Promise<import("./entities/journal.entity").ChartOfAccount[]>;
    createCOA(u: JwtPayload, dto: any): Promise<import("./entities/journal.entity").ChartOfAccount>;
    findJournals(u: JwtPayload, q: any): Promise<{
        data: import("./entities/journal.entity").JournalEntry[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createJournal(u: JwtPayload, dto: any): Promise<import("./entities/journal.entity").JournalEntry>;
    postJournal(u: JwtPayload, id: string): Promise<import("./entities/journal.entity").JournalEntry | null>;
    getBudgetSummary(u: JwtPayload, pid: string): Promise<{
        totalBudget: number;
        totalActual: number;
        variance: number;
    }>;
    findBudgets(u: JwtPayload, pid: string): Promise<import("./entities/budget.entity").Budget[]>;
    createBudget(u: JwtPayload, dto: any): Promise<import("./entities/budget.entity").Budget>;
    updateBudget(u: JwtPayload, id: string, dto: any): Promise<import("./entities/budget.entity").Budget | null>;
    removeBudget(u: JwtPayload, id: string): Promise<void>;
    findBankAccounts(u: JwtPayload): Promise<import("./entities/bank-account.entity").BankAccount[]>;
    createBankAccount(u: JwtPayload, dto: any): Promise<import("./entities/bank-account.entity").BankAccount>;
    updateBankAccount(u: JwtPayload, id: string, dto: any): Promise<import("./entities/bank-account.entity").BankAccount | null>;
    findTx(u: JwtPayload, id: string): Promise<import("./entities/bank-transaction.entity").BankTransaction[]>;
    createTx(u: JwtPayload, id: string, dto: any): Promise<import("./entities/bank-transaction.entity").BankTransaction>;
    reconcile(u: JwtPayload, txId: string, dto: any): Promise<import("./entities/bank-transaction.entity").BankTransaction | null>;
    getRecon(u: JwtPayload, id: string): Promise<any>;
    findTaxRates(u: JwtPayload): Promise<import("./entities/tax.entity").TaxRate[]>;
    createTaxRate(u: JwtPayload, dto: any): Promise<import("./entities/tax.entity").TaxRate>;
    updateTaxRate(u: JwtPayload, id: string, dto: any): Promise<import("./entities/tax.entity").TaxRate | null>;
    findExpenses(u: JwtPayload, q: any): Promise<{
        data: import("./entities/tax.entity").ExpenseClaim[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    createExpense(u: JwtPayload, dto: any): Promise<import("./entities/tax.entity").ExpenseClaim>;
    approveExpense(u: JwtPayload, id: string): Promise<import("./entities/tax.entity").ExpenseClaim | null>;
    rejectExpense(u: JwtPayload, id: string): Promise<import("./entities/tax.entity").ExpenseClaim | null>;
    getPL(u: JwtPayload, sd: string, ed: string): Promise<{
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
    getCashflow(u: JwtPayload): Promise<{
        inflow: number;
        outflow: number;
        net: number;
        breakdown: {
            clientPayments: number;
            vendorPayments: number;
            expenseClaims: number;
        };
    }>;
    getBalanceSheet(u: JwtPayload): Promise<{
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
