import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly svc: UsersService) {}

  @Get('me')
  getProfile(@CurrentUser() u: JwtPayload) {
    return this.svc.getProfile(u.sub);
  }

  @Get()
  findAll(@CurrentUser() u: JwtPayload, @Query() q: any) {
    return this.svc.findAll(u.tenantId!, q);
  }

  @Post('invite')
  invite(@CurrentUser() u: JwtPayload, @Body() dto: any) {
    return this.svc.invite(u.tenantId!, dto);
  }

  @Get(':id')
  findOne(@CurrentUser() u: JwtPayload, @Param('id') id: string) {
    return this.svc.findOne(u.tenantId!, id);
  }

  @Patch(':id')
  update(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) {
    return this.svc.update(u.tenantId!, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@CurrentUser() u: JwtPayload, @Param('id') id: string) {
    return this.svc.remove(u.tenantId!, id);
  }
}
