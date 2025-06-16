import { DataSource, Repository } from "typeorm";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItems";
import { AppDataSource } from "../config/datasource";
import { Order_status } from "../entity/Order_status";


export class OrderService {
  getDataSource() {
    throw new Error("Method not implemented.");
  }
  private orderRepository: Repository<Order>;
  private orderItemRepository: Repository<OrderItem>;
  private statusRepository: Repository<Order_status>;
  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
    this.orderItemRepository = AppDataSource.getRepository(OrderItem);
    this.statusRepository = AppDataSource.getRepository(Order_status);
  }

  // Lấy tất cả đơn hàng
  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: [
        "user",
        "shippingAddress",
        "shippingMethod",
        "orderStatus",
        "orderItems",

      ],
    });
  }

  // Lấy đơn hàng theo ID
  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: [
        "user",
        "shippingAddress",
        "shippingMethod",
        "orderStatus",
        "orderItems",
        "orderItems.productItem", // Thêm quan hệ với productItem
        "orderItems.productItem.product", // Thêm quan hệ với product
      ],
    });
  }

  // Tạo đơn hàng mới
  async createOrder(data: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(data);
    return this.orderRepository.save(order);
  }

    // Tạo đơn hàng kèm danh sách order_items
 async createOrderWithItems(data: any): Promise<Order> {
    return await AppDataSource.manager.transaction(async manager => {
      const {
        user_id,
        shipping_address_id,
        shipping_method_id,
        order_status_id,
        order_total,
        order_items,
      } = data;

      const orderRepo = manager.getRepository(Order);
      const orderItemRepo = manager.getRepository(OrderItem);

      const orderTotal = order_items.reduce((sum: number, item: any) => {
        const quantity = parseFloat(item.quantity); // quantity là string
        const price = parseFloat(item.price);       // price là string
        return sum + quantity * price;
      }, 0);
      
      const orderEntity = orderRepo.create({
        user:           { id: user_id },
        shippingAddress:{ id: shipping_address_id },
        shippingMethod: { id: shipping_method_id },
        orderStatus:    { id: order_status_id },
        order_total: orderTotal.toFixed(2),
      });

      const savedOrder = await orderRepo.save(orderEntity);

      const orderItemEntities = order_items.map((item: any) =>
        orderItemRepo.create({
          order: savedOrder,
          productItem: { id: item.product_item_id },
          quantity: item.quantity,
          price: item.price,
        })
      );

      const savedItems = await orderItemRepo.save(orderItemEntities);

      savedOrder.orderItems = savedItems;

      return await orderRepo.findOneOrFail({
        where: { id: savedOrder.id },
        relations: [
          "user",
          "shippingAddress",
          "shippingMethod",
          "orderStatus",
          "orderItems",
        ],
      });
    });
  }


  // Cập nhật thông tin đơn hàng
  async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    const order = await this.getOrderById(id);
    if (!order) return null;

    Object.assign(order, data);
    return this.orderRepository.save(order);
  }

  // Xóa đơn hàng
  async deleteOrder(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected !== 0;
  }

  // Thêm chi tiết đơn hàng
  async addOrderItem(orderId: number, orderItemData: Partial<OrderItem>): Promise<OrderItem> {
    const order = await this.getOrderById(orderId);
    if (!order) throw new Error("Order not found");

    const orderItem = this.orderItemRepository.create({
      ...orderItemData,
      order, // Liên kết đơn hàng
    });

    return this.orderItemRepository.save(orderItem);
  }

  // Cập nhật trạng thái đơn hàng bằng status text
async updateOrderStatusByText(orderId: number, statusText: string): Promise<Order | null> {
  const order = await this.orderRepository.findOne({
    where: { id: orderId },
    relations: ['orderStatus'],
  });

  if (!order) return null;

  const statusRepo = AppDataSource.getRepository(Order_status);
  const newStatus = await statusRepo.findOne({ where: { status: statusText } });

  if (!newStatus) throw new Error("Invalid status text");

  order.orderStatus = newStatus;

  return this.orderRepository.save(order);
}
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "shippingAddress", "shippingMethod", "orderStatus", "orderItems", "orderItems.productItem"]
    });
  }
  async updateStatus(orderId: number, statusId: number): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ["orderStatus", "user", "shippingAddress"],
    });

    if (!order) return null;

    const status = await this.statusRepository.findOneBy({ id: statusId });
    if (!status) throw new Error("Order status not found");

    order.orderStatus = status;
    await this.orderRepository.save(order);

    // Load lại đầy đủ dữ liệu sau khi save
    return this.orderRepository.findOne({
      where: { id: orderId },
      relations: ["user", "orderStatus", "shippingAddress"],
    });
  }
}
