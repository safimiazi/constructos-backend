import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SuperadminService } from './superadmin.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/interfaces/jwt-payload.interface';
import { TenantStatus } from '../tenants/entities/tenant.entity';

@ApiTags('SuperAdmin')
@ApiBearerAuth()
@Roles(UserRole.SUPERADMIN)
@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly svc: SuperadminService) {}

  @Get('stats')
  getStats() {
    return this.svc.getDashboardStats();
  }

  @Get('tenants')
  findTenants(@Query() q: any) {
    return this.svc.findTenants(q);
  }

  @Get('tenants/:id')
  findTenant(@Param('id') id: string) {
    return this.svc.findTenant(id);
  }

  @Patch('tenants/:id/status')
  updateStatus(@Param('id') id: string, @Body() dto: { status: TenantStatus }) {
    return this.svc.updateTenantStatus(id, dto.status);
  }

  @Get('plans')
  findPlans() {
    return this.svc.findPlans();
  }

  @Post('plans')
  createPlan(@Body() dto: any) {
    return this.svc.createPlan(dto);
  }

  @Patch('plans/:id')
  updatePlan(@Param('id') id: string, @Body() dto: any) {
    return this.svc.updatePlan(id, dto);
  }

  @Get('users')
  findAllUsers(@Query() q: any) {
    return this.svc.findAllUsers(q);
  }
}
