import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Order_item } from "./Order_item";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order_item, (orderItem) => orderItem.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "order_item_id" })
  order_item!: Order_item;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rate!: number;

  @Column()
  create_at!: Date;
}
