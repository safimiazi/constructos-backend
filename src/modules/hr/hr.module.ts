import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Attendance } from './entities/attendance.entity';
import { Leave } from './entities/leave.entity';
import { PayrollRun, PayrollItem } from './entities/payroll.entity';
import { Department } from './entities/department.entity';
import { JobPosting, Applicant } from './entities/job-posting.entity';
import { LeaveType } from './entities/leave-type.entity';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Attendance, Leave, PayrollRun, PayrollItem, Department, JobPosting, Applicant, LeaveType])],
  controllers: [HrController],
  providers: [HrService],
  exports: [HrService],
})
export class HrModule {}
