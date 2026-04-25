import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { Plan } from '../billing/entities/plan.entity';
import { Subscription } from '../billing/entities/subscription.entity';
import { Announcement } from './entities/announcement.entity';
import { SuperadminService } from './superadmin.service';
import { SuperadminController } from './superadmin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, User, Plan, Subscription, Announcement]),
    JwtModule.registerAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: (c: ConfigService) => ({ secret: c.get('JWT_SECRET') }) }),
  ],
  controllers: [SuperadminController],
  providers: [SuperadminService],
})
export class SuperadminModule {}
