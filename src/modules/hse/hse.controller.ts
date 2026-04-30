import { Controller, Get, Post, Patch, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { HseService } from './hse.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('HSE')
@ApiBearerAuth()
@Controller('hse')
export class HseController {
  constructor(private readonly svc: HseService) {}

  @Get('dashboard') getDashboard(@CurrentUser() u: JwtPayload) { return this.svc.getHSEDashboard(u.tenantId!); }

  // Incidents
  @Get('incidents') findAll(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findAll(u.tenantId!, q); }
  @Get('incidents/stats') getStats(@CurrentUser() u: JwtPayload) { return this.svc.getStats(u.tenantId!); }
  @Post('incidents') create(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.create(u.tenantId!, u.sub, dto); }
  @Get('incidents/:id') findOne(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findOne(u.tenantId!, id); }
  @Patch('incidents/:id') update(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.update(u.tenantId!, id, dto); }
  @Patch('incidents/:id/close') @HttpCode(HttpStatus.OK) close(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.close(u.tenantId!, id); }

  // Permits to Work
  @Get('ptw') findPTWs(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findPTWs(u.tenantId!, q); }
  @Post('ptw') createPTW(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createPTW(u.tenantId!, u.sub, dto); }
  @Patch('ptw/:id') updatePTW(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updatePTW(u.tenantId!, id, dto); }
  @Patch('ptw/:id/close') closePTW(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.closePTW(u.tenantId!, id); }

  // Safety Checklists
  @Get('checklists') findChecklists(@CurrentUser() u: JwtPayload, @Query('projectId') pid?: string) { return this.svc.findChecklists(u.tenantId!, pid); }
  @Post('checklists') createChecklist(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createChecklist(u.tenantId!, u.sub, dto); }
  @Patch('checklists/:id/submit') submitChecklist(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: { responses: any[] }) { return this.svc.submitChecklist(u.tenantId!, id, dto.responses); }
}
