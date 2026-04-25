import { Controller, Get, Patch, Body } from '@nestjs/common';
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
}
