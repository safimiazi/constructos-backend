import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuditLogService } from './audit-log.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly svc: AuditLogService) {}

  @Get()
  findAll(@CurrentUser() u: JwtPayload, @Query() q: any) {
    const tenantId = u.isSuperAdmin ? q.tenantId : u.tenantId!;
    return this.svc.findAll({ ...q, tenantId });
  }
}
