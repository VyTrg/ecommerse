import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product_item } from "./Product_item";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  image_url!: string;

  @OneToMany(() => Product_item, (productItem) => productItem.image)
  productItems!: Product_item[]; 
}
