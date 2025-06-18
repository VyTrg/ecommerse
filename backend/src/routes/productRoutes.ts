import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { keycloak, adminOnly } from "../middleware/keycloak";

const router = Router();
router.get("/search", ProductController.searchProducts);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

router.get('/sale', ProductController.getSaleProducts);

router.post("/",keycloak.protect(adminOnly), ProductController.createProduct);
router.put("/:id",keycloak.protect(adminOnly), ProductController.updateProduct);


// router.get('/sale', ProductController.getSaleProducts);
router.post("/",keycloak.protect(adminOnly), ProductController.createProduct);
router.put("/:id",keycloak.protect(adminOnly), ProductController.updateProduct);
router.delete("/:id", keycloak.protect(adminOnly),ProductController.deleteProduct);


export default router;

