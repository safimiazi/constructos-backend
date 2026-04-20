import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrmService } from './crm.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { LeadStage } from './entities/lead.entity';

@ApiTags('CRM')
@ApiBearerAuth()
@Controller('crm')
export class CrmController {
  constructor(private readonly svc: CrmService) {}

  @Get('clients') findClients(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findClients(u.tenantId!, q); }
  @Post('clients') createClient(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createClient(u.tenantId!, u.sub, dto); }
  @Get('clients/:id') findClient(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findClient(u.tenantId!, id); }
  @Patch('clients/:id') updateClient(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateClient(u.tenantId!, id, dto); }
  @Delete('clients/:id') @HttpCode(HttpStatus.NO_CONTENT) removeClient(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeClient(u.tenantId!, id); }

  @Get('leads/pipeline') getPipeline(@CurrentUser() u: JwtPayload) { return this.svc.getPipelineSummary(u.tenantId!); }
  @Get('leads') findLeads(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findLeads(u.tenantId!, q); }
  @Post('leads') createLead(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createLead(u.tenantId!, u.sub, dto); }
  @Get('leads/:id') findLead(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findLead(u.tenantId!, id); }
  @Patch('leads/:id') updateLead(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateLead(u.tenantId!, id, dto); }
  @Patch('leads/:id/stage') moveStage(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: { stage: LeadStage }) { return this.svc.moveLeadStage(u.tenantId!, id, dto.stage); }
  @Delete('leads/:id') @HttpCode(HttpStatus.NO_CONTENT) removeLead(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeLead(u.tenantId!, id); }
}
