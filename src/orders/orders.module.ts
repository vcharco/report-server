import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { OrderDetails } from './entities/order-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails])],
  controllers: [],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
