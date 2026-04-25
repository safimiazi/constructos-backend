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

  // Tasks (WBS)
  @Get(':id/tasks') getTasks(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getTasks(u.tenantId!, id); }
  @Post(':id/tasks') createTask(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createTask(u.tenantId!, id, u.sub, dto); }
  @Patch(':id/tasks/:taskId') updateTask(@CurrentUser() u: JwtPayload, @Param('taskId') taskId: string, @Body() dto: any) { return this.svc.updateTask(u.tenantId!, taskId, dto); }
  @Delete(':id/tasks/:taskId') @HttpCode(HttpStatus.NO_CONTENT) removeTask(@CurrentUser() u: JwtPayload, @Param('taskId') taskId: string) { return this.svc.removeTask(u.tenantId!, taskId); }

  // Task Dependencies
  @Get(':id/tasks/:taskId/dependencies') getDeps(@CurrentUser() u: JwtPayload, @Param('taskId') taskId: string) { return this.svc.getTaskDependencies(u.tenantId!, taskId); }
  @Post(':id/tasks/:taskId/dependencies') createDep(@CurrentUser() u: JwtPayload, @Param('taskId') taskId: string, @Body() dto: any) { return this.svc.createDependency(u.tenantId!, u.sub, { ...dto, taskId }); }
  @Delete(':id/tasks/:taskId/dependencies/:depId') @HttpCode(HttpStatus.NO_CONTENT) removeDep(@CurrentUser() u: JwtPayload, @Param('depId') depId: string) { return this.svc.removeDependency(u.tenantId!, depId); }

  // Gantt
  @Get(':id/gantt') getGantt(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getGanttData(u.tenantId!, id); }

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

  // Subcontracts
  @Get(':id/subcontracts') getSubs(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getSubcontracts(u.tenantId!, id); }
  @Post(':id/subcontracts') createSub(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createSubcontract(u.tenantId!, u.sub, { ...dto, projectId: id }); }
  @Patch(':id/subcontracts/:sid') updateSub(@CurrentUser() u: JwtPayload, @Param('sid') sid: string, @Body() dto: any) { return this.svc.updateSubcontract(u.tenantId!, sid, dto); }

  // Risks
  @Get(':id/risks') getRisks(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.getRisks(u.tenantId!, id); }
  @Post(':id/risks') createRisk(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.createRisk(u.tenantId!, u.sub, { ...dto, projectId: id }); }
  @Patch(':id/risks/:rid') updateRisk(@CurrentUser() u: JwtPayload, @Param('rid') rid: string, @Body() dto: any) { return this.svc.updateRisk(u.tenantId!, rid, dto); }
}
