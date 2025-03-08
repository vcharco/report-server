import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './entities/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  controllers: [],
  providers: [CustomersService],
})
export class CustomersModule {}
