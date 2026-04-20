import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}

  @Get('dashboard') getDashboard(@CurrentUser() u: JwtPayload) { return this.svc.getDashboard(u.tenantId!); }
  @Get() findAll(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findAll(u.tenantId!, q); }
  @Post() create(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.create(u.tenantId!, u.sub, dto); }
  @Get(':id') findOne(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findOne(u.tenantId!, id); }
  @Patch(':id') update(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.update(u.tenantId!, id, dto); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) remove(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.remove(u.tenantId!, id); }

  // Tasks
  @Get(':id/tasks') getTasks(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getTasks(u.tenantId!, id); }
  @Post(':id/tasks') createTask(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createTask(u.tenantId!, id, u.sub, dto); }
  @Patch(':id/tasks/:taskId') updateTask(@CurrentUser() u: JwtPayload, @Param('taskId') taskId: string, @Body() dto: any) { return this.svc.updateTask(u.tenantId!, taskId, dto); }
  @Delete(':id/tasks/:taskId') @HttpCode(HttpStatus.NO_CONTENT) removeTask(@CurrentUser() u: JwtPayload, @Param('taskId') taskId: string) { return this.svc.removeTask(u.tenantId!, taskId); }

  // Daily logs
  @Get(':id/daily-logs') getLogs(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getLogs(u.tenantId!, id); }
  @Post(':id/daily-logs') createLog(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createLog(u.tenantId!, id, u.sub, dto); }

  // Milestones
  @Get(':id/milestones') getMilestones(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getMilestones(u.tenantId!, id); }
  @Post(':id/milestones') createMilestone(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createMilestone(u.tenantId!, id, u.sub, dto); }
  @Patch(':id/milestones/:mid') updateMilestone(@CurrentUser() u: JwtPayload, @Param('mid') mid: string, @Body() dto: any) { return this.svc.updateMilestone(u.tenantId!, mid, dto); }
  @Delete(':id/milestones/:mid') @HttpCode(HttpStatus.NO_CONTENT) removeMilestone(@CurrentUser() u: JwtPayload, @Param('mid') mid: string) { return this.svc.removeMilestone(u.tenantId!, mid); }

  // Issues
  @Get(':id/issues') getIssues(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Query() q: any) { return this.svc.getIssues(u.tenantId!, id, q); }
  @Post(':id/issues') createIssue(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createIssue(u.tenantId!, id, u.sub, dto); }
  @Patch(':id/issues/:iid') updateIssue(@CurrentUser() u: JwtPayload, @Param('iid') iid: string, @Body() dto: any) { return this.svc.updateIssue(u.tenantId!, iid, dto); }
}
