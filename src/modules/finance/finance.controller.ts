import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { InvoiceStatus } from './entities/invoice.entity';

@ApiTags('Finance')
@ApiBearerAuth()
@Controller('finance')
export class FinanceController {
  constructor(private readonly svc: FinanceService) {}

  // Invoices
  @Get('invoices/stats') getStats(@CurrentUser() u: JwtPayload) { return this.svc.getDashboardStats(u.tenantId!); }
  @Get('invoices') findInvoices(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findInvoices(u.tenantId!, q); }
  @Post('invoices') createInvoice(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createInvoice(u.tenantId!, u.sub, dto); }
  @Get('invoices/:id') findInvoice(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findInvoice(u.tenantId!, id); }
  @Patch('invoices/:id') updateInvoice(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateInvoice(u.tenantId!, id, dto); }
  @Patch('invoices/:id/status') updateStatus(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: { status: InvoiceStatus }) { return this.svc.updateStatus(u.tenantId!, id, dto.status); }
  @Post('invoices/:id/payments') recordPayment(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.recordPayment(u.tenantId!, id, u.sub, dto); }
  @Get('invoices/:id/payments') getPayments(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getInvoicePayments(u.tenantId!, id); }
  @Delete('invoices/:id') @HttpCode(HttpStatus.NO_CONTENT) removeInvoice(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeInvoice(u.tenantId!, id); }

  // COA
  @Get('coa') findCOA(@CurrentUser() u: JwtPayload) { return this.svc.findCOA(u.tenantId!); }
  @Post('coa') createCOA(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createCOA(u.tenantId!, u.sub, dto); }

  // Journal Entries
  @Get('journal-entries') findJournals(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findJournals(u.tenantId!, q); }
  @Post('journal-entries') createJournal(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createJournal(u.tenantId!, u.sub, dto); }
  @Post('journal-entries/:id/post') postJournal(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.postJournal(u.tenantId!, id); }

  // Budgets
  @Get('budgets/:projectId/summary') getBudgetSummary(@CurrentUser() u: JwtPayload, @Param('projectId') pid: string) { return this.svc.getBudgetSummary(u.tenantId!, pid); }
  @Get('budgets/:projectId') findBudgets(@CurrentUser() u: JwtPayload, @Param('projectId') pid: string) { return this.svc.findBudgets(u.tenantId!, pid); }
  @Post('budgets') createBudget(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createBudget(u.tenantId!, u.sub, dto); }
  @Patch('budgets/:id') updateBudget(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateBudget(u.tenantId!, id, dto); }
  @Delete('budgets/:id') @HttpCode(HttpStatus.NO_CONTENT) removeBudget(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeBudget(u.tenantId!, id); }

  // Bank Accounts
  @Get('bank-accounts') findBankAccounts(@CurrentUser() u: JwtPayload) { return this.svc.findBankAccounts(u.tenantId!); }
  @Post('bank-accounts') createBankAccount(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createBankAccount(u.tenantId!, u.sub, dto); }
  @Patch('bank-accounts/:id') updateBankAccount(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateBankAccount(u.tenantId!, id, dto); }

  // Bank Transactions & Reconciliation
  @Get('bank-accounts/:id/transactions') findTx(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findTransactions(u.tenantId!, id); }
  @Post('bank-accounts/:id/transactions') createTx(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createTransaction(u.tenantId!, u.sub, { ...dto, bankAccountId: id }); }
  @Patch('bank-accounts/:id/transactions/:txId/reconcile') reconcile(@CurrentUser() u: JwtPayload, @Param('txId') txId: string, @Body() dto: any) { return this.svc.reconcileTransaction(u.tenantId!, txId, dto.invoiceId); }
  @Get('bank-accounts/:id/reconciliation') getRecon(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getReconciliationSummary(u.tenantId!, id); }

  // Tax Rates
  @Get('tax-rates') findTaxRates(@CurrentUser() u: JwtPayload) { return this.svc.findTaxRates(u.tenantId!); }
  @Post('tax-rates') createTaxRate(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createTaxRate(u.tenantId!, u.sub, dto); }
  @Patch('tax-rates/:id') updateTaxRate(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateTaxRate(u.tenantId!, id, dto); }

  // Expense Claims
  @Get('expenses') findExpenses(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findExpenses(u.tenantId!, q); }
  @Post('expenses') createExpense(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createExpense(u.tenantId!, u.sub, dto); }
  @Patch('expenses/:id/approve') approveExpense(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.approveExpense(u.tenantId!, id, u.sub); }
  @Patch('expenses/:id/reject') rejectExpense(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.rejectExpense(u.tenantId!, id); }

  // Reports
  @Get('reports/pl') getPL(@CurrentUser() u: JwtPayload, @Query('startDate') sd: string, @Query('endDate') ed: string) { return this.svc.getPLReport(u.tenantId!, sd, ed); }
  @Get('reports/cashflow') getCashflow(@CurrentUser() u: JwtPayload) { return this.svc.getCashflowReport(u.tenantId!); }
  @Get('reports/balance-sheet') getBalanceSheet(@CurrentUser() u: JwtPayload) { return this.svc.getBalanceSheet(u.tenantId!); }
}
