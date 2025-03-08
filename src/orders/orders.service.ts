import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'output/entities/Orders';
import { Repository } from 'typeorm';

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
      relations: { orderDetails: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
