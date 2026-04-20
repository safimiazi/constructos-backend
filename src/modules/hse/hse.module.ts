import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { HseService } from './hse.service';
import { HseController } from './hse.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  controllers: [HseController],
  providers: [HseService],
  exports: [HseService],
})
export class HseModule {}
