import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('Company')
@ApiBearerAuth()
@Controller('company')
export class TenantsController {
  constructor(private readonly svc: TenantsService) {}

  @Get()
  getCompany(@CurrentUser() u: JwtPayload) {
    return this.svc.getCompany(u.tenantId!);
  }

  @Patch()
  updateCompany(@CurrentUser() u: JwtPayload, @Body() dto: any) {
    return this.svc.updateCompany(u.tenantId!, dto);
  }

  // Branches
  @Get('branches')
  getBranches(@CurrentUser() u: JwtPayload) {
    return this.svc.findBranches(u.tenantId!);
  }

  @Post('branches')
  createBranch(@CurrentUser() u: JwtPayload, @Body() dto: any) {
    return this.svc.createBranch(u.tenantId!, u.sub, dto);
  }

  @Patch('branches/:id')
  updateBranch(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) {
    return this.svc.updateBranch(u.tenantId!, id, dto);
  }

  @Delete('branches/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeBranch(@CurrentUser() u: JwtPayload, @Param('id') id: string) {
    return this.svc.removeBranch(u.tenantId!, id);
  }
}
