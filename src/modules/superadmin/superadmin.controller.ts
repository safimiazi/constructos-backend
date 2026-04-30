import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SuperadminService } from './superadmin.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/interfaces/jwt-payload.interface';
import { TenantStatus } from '../tenants/entities/tenant.entity';

@ApiTags('SuperAdmin')
@ApiBearerAuth()
@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly svc: SuperadminService) {}

  @Get('stats') @Roles(UserRole.SUPERADMIN) getStats() { return this.svc.getDashboardStats(); }
  @Get('billing/overview') @Roles(UserRole.SUPERADMIN) getBillingOverview() { return this.svc.getBillingOverview(); }
  @Get('analytics/growth') @Roles(UserRole.SUPERADMIN) getGrowth() { return this.svc.getGrowthAnalytics(); }
  @Get('analytics/tenant-status') @Roles(UserRole.SUPERADMIN) getTenantStatus() { return this.svc.getTenantStatusBreakdown(); }
  @Get('analytics/plan-distribution') @Roles(UserRole.SUPERADMIN) getPlanDist() { return this.svc.getPlanDistribution(); }
  @Get('analytics/top-tenants') @Roles(UserRole.SUPERADMIN) getTopTenants() { return this.svc.getTopTenants(); }

  @Get('tenants') @Roles(UserRole.SUPERADMIN) findTenants(@Query() q: any) { return this.svc.findTenants(q); }
  @Post('tenants') @Roles(UserRole.SUPERADMIN) createTenant(@Body() dto: any) { return this.svc.createTenant(dto); }
  @Get('tenants/:id') @Roles(UserRole.SUPERADMIN) findTenant(@Param('id') id: string) { return this.svc.findTenant(id); }
  @Patch('tenants/:id/status') @Roles(UserRole.SUPERADMIN) updateStatus(@Param('id') id: string, @Body() dto: { status: TenantStatus }) { return this.svc.updateTenantStatus(id, dto.status); }
  @Post('tenants/:id/impersonate') @Roles(UserRole.SUPERADMIN) impersonate(@Param('id') id: string) { return this.svc.impersonateTenant(id); }

  @Get('plans') @Roles(UserRole.SUPERADMIN) findPlans() { return this.svc.findPlans(); }
  @Post('plans') @Roles(UserRole.SUPERADMIN) createPlan(@Body() dto: any) { return this.svc.createPlan(dto); }
  @Patch('plans/:id') @Roles(UserRole.SUPERADMIN) updatePlan(@Param('id') id: string, @Body() dto: any) { return this.svc.updatePlan(id, dto); }

  @Get('users') @Roles(UserRole.SUPERADMIN) findAllUsers(@Query() q: any) { return this.svc.findAllUsers(q); }

  // Public — tenants can fetch active announcements (must be before /:id route)
  @Public()
  @Get('announcements/active')
  getActiveAnnouncements() { return this.svc.getActiveAnnouncements(); }

  @Get('announcements/tenant')
  getAnnouncementsForTenant(@CurrentUser() user: any) {
    if (!user?.tenantId) throw new Error('No tenant context');
    return this.svc.getActiveAnnouncementsForTenant(user.tenantId);
  }

  @Get('announcements') @Roles(UserRole.SUPERADMIN) findAnnouncements() { return this.svc.findAnnouncements(); }
  @Post('announcements') @Roles(UserRole.SUPERADMIN) createAnnouncement(@Body() dto: any) { return this.svc.createAnnouncement(dto); }
  @Patch('announcements/:id') @Roles(UserRole.SUPERADMIN) updateAnnouncement(@Param('id') id: string, @Body() dto: any) { return this.svc.updateAnnouncement(id, dto); }
  @Delete('announcements/:id') @Roles(UserRole.SUPERADMIN) @HttpCode(HttpStatus.NO_CONTENT) deleteAnnouncement(@Param('id') id: string) { return this.svc.deleteAnnouncement(id); }
}
