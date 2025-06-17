import { Repository, DeepPartial } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Order } from "../entity/Order";
import { ProductItem } from "../entity/ProductItem";
import { OrderItem } from "../entity/OrderItems";

export class OrderItemService {
  private orderItemRepository: Repository<OrderItem>;
  private orderRepository: Repository<Order>;
  private productItemRepository: Repository<ProductItem>;

  constructor() {
    this.orderItemRepository = AppDataSource.getRepository(OrderItem);
    this.orderRepository = AppDataSource.getRepository(Order);
    this.productItemRepository = AppDataSource.getRepository(ProductItem);
  }

  // Lấy tất cả order items (có quan hệ)
  async getAllOrderItems(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      relations: ["order", "productItem"],
    });
  }

  async getByOrderId(orderId: number): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      where: { order: { id: orderId } },
      relations: ["productItem", "productItem.product"],
    });
  }

  // Tạo mới order item
  async createOrderItem(data: {
    order: { id: number };
    productItem: { id: number };
    quantity: string;
    price: string;
  }): Promise<OrderItem> {
    const order = await this.orderRepository.findOne({
      where: { id: data.order.id },
    });
    if (!order) throw new Error("Order not found");

    const productItem = await this.productItemRepository.findOne({
      where: { id: data.productItem.id },
    });
    if (!productItem) throw new Error("ProductItem not found");

    const orderItemData: DeepPartial<OrderItem> = {
      order,
      productItem,
      quantity: parseFloat(data.quantity),
      price: parseFloat(data.price),
    };

    const orderItem = this.orderItemRepository.create(orderItemData);
    return this.orderItemRepository.save(orderItem);
  }

  async deleteOrderItem(id: number): Promise<boolean> {
    const result = await this.orderItemRepository.delete(id);
    return result.affected !== 0;
  }
}
