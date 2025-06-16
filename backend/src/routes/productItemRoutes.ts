import {Router } from 'express';
import { ProductItemController } from '../controllers/ProductItemController';
import { keycloak, adminOnly } from "../middleware/keycloak";
const router = Router();

router.get('/', ProductItemController.getAllProductItems);
router.get('/:id', ProductItemController.getProductItemById);
router.get('/product/:productId', ProductItemController.getProductItemsByProductId);
router.post('/',keycloak.protect(adminOnly), ProductItemController.createProductItem);
router.put('/:id', keycloak.protect(adminOnly),ProductItemController.updateProductItem);
router.delete('/:id',keycloak.protect(adminOnly), ProductItemController.deleteProductItem);

export default router;