import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [],
  providers: [ProductsService],
})
export class ProductsModule {}
