import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("customers_pkey", ["customerId"], { unique: true })
@Entity("customers", { schema: "public" })
export class Customers {
  @PrimaryGeneratedColumn({ type: "integer", name: "customer_id" })
  customerId: number;

  @Column("character varying", {
    name: "customer_name",
    nullable: true,
    length: 255,
  })
  customerName: string | null;

  @Column("character varying", {
    name: "contact_name",
    nullable: true,
    length: 255,
  })
  contactName: string | null;

  @Column("character varying", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("character varying", { name: "city", nullable: true, length: 255 })
  city: string | null;

  @Column("character varying", {
    name: "postal_code",
    nullable: true,
    length: 255,
  })
  postalCode: string | null;

  @Column("character varying", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @OneToMany(() => Orders, (orders) => orders.customer)
  orders: Orders[];
}
