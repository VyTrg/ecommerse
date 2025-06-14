import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { Order } from "../entity/Order";

export class AdminOrderController {
  static async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await AppDataSource.getRepository(Order).find({
        relations: [
          "user", "shippingAddress", "shippingMethod",
          "orderStatus", "orderItems", "orderItems.productItem",
          "orderItems.productItem.product", "orderItems.productItem.images"
        ]
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  }

  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const order = await AppDataSource.getRepository(Order).findOne({
        where: { id: parseInt(req.params.id) },
        relations: [
          "user", "shippingAddress", "shippingMethod",
          "orderStatus", "orderItems", "orderItems.productItem",
          "orderItems.productItem.product", "orderItems.productItem.images"
        ]
      });

      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order", error });
    }
  }
}
