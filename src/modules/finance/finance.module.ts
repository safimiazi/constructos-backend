import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Budget } from './entities/budget.entity';
import { BankAccount } from './entities/bank-account.entity';
import { ChartOfAccount, JournalEntry, InvoicePayment } from './entities/journal.entity';
import { TaxRate, ExpenseClaim } from './entities/tax.entity';
import { BankTransaction } from './entities/bank-transaction.entity';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Budget, BankAccount, ChartOfAccount, JournalEntry, InvoicePayment, TaxRate, ExpenseClaim, BankTransaction])],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
})
export class FinanceModule {}
