import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { Plan } from '../billing/entities/plan.entity';
import { Subscription } from '../billing/entities/subscription.entity';
import { SuperadminService } from './superadmin.service';
import { SuperadminController } from './superadmin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, User, Plan, Subscription])],
  controllers: [SuperadminController],
  providers: [SuperadminService],
})
export class SuperadminModule {}
