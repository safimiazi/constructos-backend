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
  @Get('invoices') findInvoices(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findInvoices(u.tenantId!, q); }
  @Get('invoices/stats') getStats(@CurrentUser() u: JwtPayload) { return this.svc.getDashboardStats(u.tenantId!); }
  @Post('invoices') createInvoice(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createInvoice(u.tenantId!, u.sub, dto); }
  @Get('invoices/:id') findInvoice(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findInvoice(u.tenantId!, id); }
  @Patch('invoices/:id') updateInvoice(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateInvoice(u.tenantId!, id, dto); }
  @Patch('invoices/:id/status') updateStatus(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: { status: InvoiceStatus }) { return this.svc.updateStatus(u.tenantId!, id, dto.status); }
  @Delete('invoices/:id') @HttpCode(HttpStatus.NO_CONTENT) removeInvoice(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeInvoice(u.tenantId!, id); }

  // Budgets
  @Get('budgets/:projectId') findBudgets(@CurrentUser() u: JwtPayload, @Param('projectId') pid: string) { return this.svc.findBudgets(u.tenantId!, pid); }
  @Get('budgets/:projectId/summary') getBudgetSummary(@CurrentUser() u: JwtPayload, @Param('projectId') pid: string) { return this.svc.getBudgetSummary(u.tenantId!, pid); }
  @Post('budgets') createBudget(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createBudget(u.tenantId!, u.sub, dto); }
  @Patch('budgets/:id') updateBudget(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateBudget(u.tenantId!, id, dto); }
  @Delete('budgets/:id') @HttpCode(HttpStatus.NO_CONTENT) removeBudget(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeBudget(u.tenantId!, id); }

  // Bank Accounts
  @Get('bank-accounts') findBankAccounts(@CurrentUser() u: JwtPayload) { return this.svc.findBankAccounts(u.tenantId!); }
  @Post('bank-accounts') createBankAccount(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createBankAccount(u.tenantId!, u.sub, dto); }
  @Patch('bank-accounts/:id') updateBankAccount(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateBankAccount(u.tenantId!, id, dto); }
}
