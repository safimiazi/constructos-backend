import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Lead } from './entities/lead.entity';
import { Proposal, Contract } from './entities/proposal.entity';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Lead, Proposal, Contract])],
  controllers: [CrmController],
  providers: [CrmService],
  exports: [CrmService],
})
export class CrmModule {}
