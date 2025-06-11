import { Request, Response } from "express";
import { OrderItemService } from "../services/OrderItemService";

const orderItemService = new OrderItemService();

export class OrderItemController {
    // Lấy tất cả chi tiết đơn hàng
    static async getAllOrderItems(req: Request, res: Response) {
        try {
            const orderItems = await orderItemService.getAllOrderItems();
            res.json(orderItems);
        } catch (error) {
            res.status(500).json({ message: "Error fetching order items", error });
        }
    }

    static async getByOrderId(req: Request, res: Response) {
        const orderId = parseInt(req.params.orderId, 10);
        try {
        const items = await orderItemService.getByOrderId(orderId);
        res.json(items);
        } catch (err) {
        res.status(500).json({ message: "Error fetching items", error: err });
        }
    }
    static async createOrderItem(req: Request, res: Response) {
    // ép req.body thành đúng interface
    try {
      const { orderId, productItemId, quantity, price } = req.body;
      const item = await orderItemService.createOrderItem({
        order: { id: orderId },
        productItem: { id: productItemId },
        quantity,
        price
      });
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ message: "Error creating order item", error: err });
    }
  }

    static async deleteOrderItem(req: Request, res: Response) {
        try {
            const deleted = await orderItemService.deleteOrderItem(parseInt(req.params.id));
            if (!deleted) res.status(404).json({ message: "Order item not found" });
            else res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting order item", error });
        }
    }
}