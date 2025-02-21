import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Address } from "./Address";
import { Shipping_method } from "./Shipping_method";
import { Order_status } from "./Order_status";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User; 

  @ManyToOne(() => Address, { onDelete: "CASCADE" })
  @JoinColumn({ name: "shipping_address_id" })
  shippingAddress!: Address; 

  @ManyToOne(() => Shipping_method, { onDelete: "SET NULL" })
  @JoinColumn({ name: "shipping_method_id" })
  shippingMethod!: Shipping_method; 

  @ManyToOne(() => Order_status, { onDelete: "SET NULL" })
  @JoinColumn({ name: "order_status_id" })
  orderStatus!: Order_status; 

  @CreateDateColumn()
  orderDate!: Date; // Tự động lưu ngày đặt hàng.

  @Column({ type: "decimal", precision: 10, scale: 2 })
  order_total!: string; 
}
