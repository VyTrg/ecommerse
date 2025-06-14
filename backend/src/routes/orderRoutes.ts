import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const router = Router();

router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.post('/', OrderController.createOrderWithItems); 

router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
router.put('/:id/status', OrderController.updateOrderStatus);
 


export default router;
