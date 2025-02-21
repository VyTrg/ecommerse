import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cart } from "./Cart";
import { Product_item } from "./Product_item"; // Sửa tên class để khớp với định danh TypeScript.

@Entity()
export class Cart_item {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cart_id" })
  cart!: Cart; // Liên kết với thực thể `Cart`.

  @ManyToOne(() => Product_item, (productItem) => productItem.cartItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_item_id" })
  productItem!: Product_item; // Liên kết với thực thể `ProductItem`.

  @Column()
  quantity!: number; // Kiểu dữ liệu là `number` cho số lượng.
}
