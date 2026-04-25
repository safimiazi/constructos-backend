import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { MaterialRequest } from './entities/material-request.entity';
import { Inventory } from './entities/inventory.entity';
import { RFQ, GRN } from './entities/rfq.entity';
import { ThreeWayMatch } from './entities/three-way-match.entity';
import { ProcurementService } from './procurement.service';
import { ProcurementController } from './procurement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, PurchaseOrder, MaterialRequest, Inventory, RFQ, GRN, ThreeWayMatch])],
  controllers: [ProcurementController],
  providers: [ProcurementService],
  exports: [ProcurementService],
})
export class ProcurementModule {}
