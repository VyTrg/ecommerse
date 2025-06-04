import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { ProductItem } from "./ProductItem";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => ProductItem, productItem => productItem.orderItems)
  @JoinColumn({ name: "product_item_id" })
  productItem!: ProductItem;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  quantity!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: string;
}
