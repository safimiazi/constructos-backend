import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('Documents')
@ApiBearerAuth()
@Controller('documents')
export class DocumentsController {
  constructor(private readonly svc: DocumentsService) {}

  @Get() findAll(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findAll(u.tenantId!, q); }
  @Get('folders') getFolders(@CurrentUser() u: JwtPayload) { return this.svc.getFolders(u.tenantId!); }
  @Post() create(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.create(u.tenantId!, u.sub, dto); }
  @Get(':id') findOne(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findOne(u.tenantId!, id); }
  @Patch(':id') update(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.update(u.tenantId!, id, dto); }
  @Patch(':id/approve') approve(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.approve(u.tenantId!, id); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) remove(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.remove(u.tenantId!, id); }
}
