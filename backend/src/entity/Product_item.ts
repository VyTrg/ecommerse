import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Product } from "./Product";
import { Size } from "./Size";
import { Image } from "./Image";
import { Color } from "./Color";
import { Cart_item } from "./Cart_item"; 

@Entity()
export class Product_item {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.productItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @ManyToOne(() => Size, (size) => size.productItems, { onDelete: "SET NULL" })
  @JoinColumn({ name: "size_id" })
  size!: Size;

  @ManyToOne(() => Image, (image) => image.productItems, { onDelete: "SET NULL" })
  @JoinColumn({ name: "image_id" })
  image!: Image;

  @ManyToOne(() => Color, (color) => color.productItems, { onDelete: "SET NULL" })
  @JoinColumn({ name: "color_id" })
  color!: Color;

  @OneToMany(() => Cart_item, (cartItem) => cartItem.productItem, { cascade: true })
  cartItems!: Cart_item[]; 

  @Column()
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: string;
}
