import { FinanceService } from './finance.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { InvoiceStatus } from './entities/invoice.entity';
export declare class FinanceController {
    private readonly svc;
    constructor(svc: FinanceService);
    findInvoices(u: JwtPayload, q: any): Promise<{
        data: import("./entities/invoice.entity").Invoice[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getStats(u: JwtPayload): Promise<{
        totalInvoiced: any;
        totalPaid: any;
        overdueCount: number;
        draftCount: number;
    }>;
    createInvoice(u: JwtPayload, dto: any): Promise<import("./entities/invoice.entity").Invoice>;
    findInvoice(u: JwtPayload, id: string): Promise<import("./entities/invoice.entity").Invoice>;
    updateInvoice(u: JwtPayload, id: string, dto: any): Promise<import("./entities/invoice.entity").Invoice>;
    updateStatus(u: JwtPayload, id: string, dto: {
        status: InvoiceStatus;
    }): Promise<import("./entities/invoice.entity").Invoice>;
    removeInvoice(u: JwtPayload, id: string): Promise<void>;
    findBudgets(u: JwtPayload, pid: string): Promise<import("./entities/budget.entity").Budget[]>;
    getBudgetSummary(u: JwtPayload, pid: string): Promise<any>;
    createBudget(u: JwtPayload, dto: any): Promise<import("./entities/budget.entity").Budget>;
    updateBudget(u: JwtPayload, id: string, dto: any): Promise<import("./entities/budget.entity").Budget | null>;
    removeBudget(u: JwtPayload, id: string): Promise<void>;
    findBankAccounts(u: JwtPayload): Promise<import("./entities/bank-account.entity").BankAccount[]>;
    createBankAccount(u: JwtPayload, dto: any): Promise<import("./entities/bank-account.entity").BankAccount>;
    updateBankAccount(u: JwtPayload, id: string, dto: any): Promise<import("./entities/bank-account.entity").BankAccount | null>;
}
