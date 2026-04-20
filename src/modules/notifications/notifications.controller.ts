import { Controller, Get, Patch, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Get()
  findAll(@CurrentUser() u: JwtPayload, @Query('page') page?: string, @Query('limit') limit?: string) {
    return this.svc.findForUser(u.sub, +page! || 1, +limit! || 20);
  }

  @Get('unread-count')
  unreadCount(@CurrentUser() u: JwtPayload) {
    return this.svc.getUnreadCount(u.sub);
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  markRead(@CurrentUser() u: JwtPayload, @Param('id') id: string) {
    return this.svc.markRead(u.sub, id);
  }

  @Patch('read-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  markAllRead(@CurrentUser() u: JwtPayload) {
    return this.svc.markAllRead(u.sub);
  }
}
