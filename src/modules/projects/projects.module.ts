import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { DailyLog } from './entities/daily-log.entity';
import { Milestone } from './entities/milestone.entity';
import { Issue } from './entities/issue.entity';
import { TaskDependency } from './entities/task-dependency.entity';
import { Subcontract } from './entities/subcontract.entity';
import { Risk } from './entities/risk.entity';
import { Defect } from './entities/defect.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task, DailyLog, Milestone, Issue, TaskDependency, Subcontract, Risk, Defect])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
