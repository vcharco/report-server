import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { Categories } from "./Categories";

@Index("products_pkey", ["productId"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @PrimaryGeneratedColumn({ type: "integer", name: "product_id" })
  productId: number;

  @Column("character varying", {
    name: "product_name",
    nullable: true,
    length: 255,
  })
  productName: string | null;

  @Column("character varying", { name: "unit", nullable: true, length: 255 })
  unit: string | null;

  @Column("numeric", { name: "price", nullable: true, precision: 10, scale: 2 })
  price: string | null;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
  orderDetails: OrderDetails[];

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Categories;
}
