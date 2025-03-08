import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from 'src/products/entities/products.entity';

@Index('order_details_pkey', ['orderDetailId'], { unique: true })
@Entity('order_details', { schema: 'public' })
export class OrderDetails {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'order_detail_id' })
  orderDetailId: number;

  @Column('integer', { name: 'quantity', nullable: true })
  quantity: number | null;

  @ManyToOne(() => Orders, (orders) => orders.orderDetails, { eager: true })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Orders;

  @ManyToOne(() => Products, (products) => products.orderDetails, {
    eager: true,
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product: Products;
}
