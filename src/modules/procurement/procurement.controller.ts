import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProcurementService } from './procurement.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@ApiTags('Procurement')
@ApiBearerAuth()
@Controller('procurement')
export class ProcurementController {
  constructor(private readonly svc: ProcurementService) {}

  // Vendors
  @Get('vendors') findVendors(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findVendors(u.tenantId!, q); }
  @Post('vendors') createVendor(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createVendor(u.tenantId!, u.sub, dto); }
  @Get('vendors/:id') findVendor(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findVendor(u.tenantId!, id); }
  @Patch('vendors/:id') updateVendor(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateVendor(u.tenantId!, id, dto); }
  @Delete('vendors/:id') @HttpCode(HttpStatus.NO_CONTENT) removeVendor(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removeVendor(u.tenantId!, id); }

  // Purchase Orders
  @Get('purchase-orders') findPOs(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findPOs(u.tenantId!, q); }
  @Post('purchase-orders') createPO(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createPO(u.tenantId!, u.sub, dto); }
  @Get('purchase-orders/:id') findPO(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.findPO(u.tenantId!, id); }
  @Patch('purchase-orders/:id') updatePO(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updatePO(u.tenantId!, id, dto); }
  @Delete('purchase-orders/:id') @HttpCode(HttpStatus.NO_CONTENT) removePO(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.removePO(u.tenantId!, id); }

  // Material Requests
  @Get('material-requests') findMRs(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findMRs(u.tenantId!, q); }
  @Post('material-requests') createMR(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createMR(u.tenantId!, u.sub, dto); }
  @Patch('material-requests/:id/approve') approveMR(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.approveMR(u.tenantId!, id, u.sub); }
  @Patch('material-requests/:id/reject') rejectMR(@CurrentUser() u: JwtPayload, @Param('id') id: string) { return this.svc.rejectMR(u.tenantId!, id); }

  // Inventory
  @Get('inventory') findInventory(@CurrentUser() u: JwtPayload, @Query() q: any) { return this.svc.findInventory(u.tenantId!, q); }
  @Post('inventory') createItem(@CurrentUser() u: JwtPayload, @Body() dto: any) { return this.svc.createInventoryItem(u.tenantId!, u.sub, dto); }
  @Patch('inventory/:id') updateItem(@CurrentUser() u: JwtPayload, @Param('id') id: string, @Body() dto: any) { return this.svc.updateInventoryItem(u.tenantId!, id, dto); }
}
