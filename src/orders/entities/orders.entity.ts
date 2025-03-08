import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { Customers } from 'src/customers/entities/customers.entity';

@Index('orders_pkey', ['orderId'], { unique: true })
@Entity('orders', { schema: 'public' })
export class Orders {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'order_id' })
  orderId: number;

  @Column('date', { name: 'order_date', nullable: true })
  orderDate: string | null;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[];

  @ManyToOne(() => Customers, (customers) => customers.orders)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer: Customers;
}
