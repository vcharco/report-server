import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from './entities/customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly repository: Repository<Customers>,
  ) {}

  async findAll(): Promise<Customers[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Customers> {
    const customer = await this.repository.findOne({
      where: { customerId: id },
      relations: { orders: true },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }
}
