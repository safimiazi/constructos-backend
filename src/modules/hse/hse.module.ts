import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { PermitToWork, SafetyChecklist } from './entities/ptw.entity';
import { HseService } from './hse.service';
import { HseController } from './hse.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Incident, PermitToWork, SafetyChecklist])],
  controllers: [HseController],
  providers: [HseService],
  exports: [HseService],
})
export class HseModule {}
