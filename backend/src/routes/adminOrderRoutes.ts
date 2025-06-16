import { Router } from 'express';
import { AdminOrderController } from '../controllers/AdminOrderController';

const router = Router();

router.get('/', AdminOrderController.getAllOrders);
router.get('/:id', AdminOrderController.getOrderById);

export default router;
