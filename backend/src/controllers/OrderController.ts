import { Request, Response, NextFunction, RequestHandler } from "express";
import { OrderService } from "../services/OrderService";
import { Product } from "../entity/Product";
import { Size } from "../entity/Size";
import { Color } from "../entity/Color";
import { Image } from "../entity/Image";

const orderService = new OrderService();

export class OrderController {
  // Lấy tất cả đơn hàng
  static async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
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

  // Tạo đơn hàng mới (chỉ order, không có items)
  static async createOrder(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error });
    }
  }

  // Tạo đơn hàng kèm danh sách order_items
  static async createOrderWithItems(req: Request, res: Response) {
    try {
      // const {
      //   user_id,
      //   shipping_address_id,
      //   shipping_method_id,
      //   order_status_id,
      //   order_total,
      //   order_items,
      // } = req.body;

      // const newOrder = await orderService.createOrder({
      //   user: {
      //       id: user_id,
      //       keycloakId: "",
      //       username: "",
      //       hash_password: "",
      //       phone: "",
      //       email: "",
      //       carts: [],
      //       orders: []
      //   },
      //   shippingAddress: {
      //       id: shipping_address_id,
      //       street_name: "",
      //       city: "",
      //       region: "",
      //       district: "",
      //       country: "",
      //       user_addresses: []
      //   },
      //   shippingMethod: {
      //       id: shipping_method_id,
      //       name: "",
      //       price: 0
      //   },
      //   orderStatus: {
      //       id: order_status_id,
      //       status: ""
      //   },
      //   order_total,
      // });

      // const createdItems = [];

      // for (const item of order_items) {
      //   const orderItem = await orderService.addOrderItem(newOrder.id, {
      //     productItem: {
      //         id: item.product_item_id,
      //         product: new Product,
      //         size: new Size,
      //         image: new Image,
      //         color: new Color,
      //         cartItems: [],
      //         orderItems: [],
      //         quantity: 0,
      //         price: ""
      //     },
      //     quantity: item.quantity,
      //     price: item.price,
      //   });
      //   createdItems.push(orderItem);
      // }

      const order = await orderService.createOrderWithItems(req.body);
      // res.status(201).json({
      //   message: "Order with items created successfully",
      //   order: newOrder,
      //   order_items: createdItems,
      // });
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

  // Xóa đơn hàng
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

  // Thêm 1 chi tiết đơn hàng vào 1 đơn có sẵn
  static async addOrderItem(req: Request, res: Response) {
    try {
      const orderItem = await orderService.addOrderItem(parseInt(req.params.id), req.body);
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: "Error adding order item", error });
    }
  }

  // Cập nhật trạng thái đơn hàng (Shipping, Delivered, Cancelled)
  static updateOrderStatus: RequestHandler = async (req, res, next) => {
    try {
      const orderId = parseInt(req.params.id, 10);
      const { status } = req.body;

      // 1) Kiểm tra req.body.status có phải string không
      if (typeof status !== "string") {
        res.status(400).json({ message: "Missing or invalid 'status' in body" });
        return; // không trả về res.json(), chỉ kết thúc hàm
      }

      // 2) Gọi service để cập nhật
      const updatedOrder = await orderService.updateOrderStatusByText(orderId, status);

      // 3) Nếu service không tìm thấy order
      if (!updatedOrder) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      // 4) Thành công: chỉ gọi res.json(...) rồi return
      res.json({ message: "Order status updated", order: updatedOrder });
      return;

    } catch (error: any) {
      // Bắt lỗi “Invalid status text” từ service
      if (error.message === "Invalid status text") {
        res.status(400).json({ message: "Invalid status value" });
        return;
      }
      // Các lỗi khác: log và trả 500
      console.error("[OrderController.updateOrderStatus] ERROR:", error);
      res.status(500).json({
        message: "Error updating order status",
        error: error.message || error.toString(),
      });
      return;
    }
  };
}
