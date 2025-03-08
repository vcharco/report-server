import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Products } from "./Products";

@Index("order_details_pkey", ["orderDetailId"], { unique: true })
@Entity("order_details", { schema: "public" })
export class OrderDetails {
  @PrimaryGeneratedColumn({ type: "integer", name: "order_detail_id" })
  orderDetailId: number;

  @Column("integer", { name: "quantity", nullable: true })
  quantity: number | null;

  @ManyToOne(() => Orders, (orders) => orders.orderDetails)
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;

  @ManyToOne(() => Products, (products) => products.orderDetails)
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Products;
}
