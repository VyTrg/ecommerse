import { Request, Response , NextFunction, RequestHandler } from "express";
import { AppDataSource } from "../config/datasource";
import { OrderService } from "../services/OrderService";
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
import { Size } from "../entity/Size";
import { Color } from "../entity/Color";
import { Image } from "../entity/Image";

const orderService = new OrderService();

export class OrderController {
static async getAllOrders(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [orders, totalCount] = await AppDataSource.getRepository(Order).findAndCount({
      skip,
      take: limit,
      order: { orderDate: "DESC" },
      relations: ["user", "orderItems", "orderItems.productItem"]
    });

    
res.json({
  data: orders,
  totalCount
});

  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }

  // Lấy đơn hàng theo ID
  static async getOrderById(req: Request, res: Response) {
    try {
      const order = await orderService.getOrderById(parseInt(req.params.id));
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.json(order);
      }
    } catch (error) {
      console.error("[OrderController.getOrderById] error:", error);
      res.status(500).json({ message: "Error fetching order", error });
    }
  }

  // Tạo đơn hàng với danh sách items
  static async createOrder(req: Request, res: Response) {
    try {
      const order = await orderService.createOrderWithItems(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error creating order with items", error });
    }
  }

  // Cập nhật đơn hàng
  static async updateOrder(req: Request, res: Response) {
    try {
      const updatedOrder = await orderService.updateOrder(parseInt(req.params.id), req.body);
      if (!updatedOrder) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.json(updatedOrder);
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating order", error });
    }
  }

  // Xoá đơn hàng
  static async deleteOrder(req: Request, res: Response) {
    try {
      const deleted = await orderService.deleteOrder(parseInt(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error });
    }
  }

  // Thêm một item vào đơn hàng có sẵn
  static async addOrderItem(req: Request, res: Response) {
    try {
      const orderItem = await orderService.addOrderItem(parseInt(req.params.id), req.body);
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: "Error adding order item", error });
    }
  }

  // Đếm tổng số đơn hàng
  static async getOrdersCount(req: Request, res: Response) {
    try {
      const count = await orderService.getOrderCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: "Error counting Order", error });
    }
  }

  // Cập nhật trạng thái đơn hàng (Shipping, Delivered, Cancelled)
  static updateOrderStatus: RequestHandler = async (req, res, next) => {
    try {
      const orderId = parseInt(req.params.id, 10);
      const { status } = req.body;

      if (typeof status !== "string") {
        res.status(400).json({ message: "Missing or invalid 'status' in body" });
        return;
      }

      const updatedOrder = await orderService.updateOrderStatusByText(orderId, status);

      if (!updatedOrder) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.json({ message: "Order status updated", order: updatedOrder });
    } catch (error: any) {
      if (error.message === "Invalid status text") {
        res.status(400).json({ message: "Invalid status value" });
        return;
      }
      console.error("[OrderController.updateOrderStatus] ERROR:", error);
      res.status(500).json({ message: "Error updating order status", error });
    }
  };

  // Lấy danh sách đơn theo user
  static async getOrdersByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    try {
      const orders = await orderService.getOrdersByUserId(userId);
      res.status(200).json(orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Hủy đơn hàng
  static async cancelOrder(req: Request, res: Response) {
    const orderId = parseInt(req.params.id);
    if (isNaN(orderId)) {
      res.status(400).json({ message: "Invalid order ID" });
      return;
    }

    try {
      const updatedOrder = await orderService.updateStatus(orderId, 3); // 3 = Canceled
      if (!updatedOrder) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
      res.status(200).json({ message: "Order canceled", order: updatedOrder });
    } catch (err) {
      console.error("Cancel order failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
}
