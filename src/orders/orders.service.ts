import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly repository: Repository<Orders>,
  ) {}

  async findAll(): Promise<Orders[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Orders> {
    const order = await this.repository.findOne({
      where: { orderId: id },
      relations: [
        'customer',
        'orderDetails',
        'orderDetails.product',
        'orderDetails.product.category',
      ],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
