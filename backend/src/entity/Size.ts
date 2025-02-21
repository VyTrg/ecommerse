import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product_item } from "./Product_item";

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Product_item, (productItem) => productItem.size)
  productItems!: Product_item[]; // Mối quan hệ một-nhiều với ProductItem.
}
