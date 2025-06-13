import {Router } from 'express';
import { OrderItemController } from '../controllers/OrderItemController';

const router = Router();

router.get('/', OrderItemController.getAllOrderItems);
router.get("/order/:orderId", OrderItemController.getByOrderId);
router.post('/', OrderItemController.createOrderItem);
router.delete('/:id', OrderItemController.deleteOrderItem);

export default router;