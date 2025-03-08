import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'output/entities/Products';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly repository: Repository<Products>,
  ) {}

  async findAll(): Promise<Products[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Products> {
    const product = await this.repository.findOne({
      where: { productId: id },
      relations: { category: true },
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }
}
