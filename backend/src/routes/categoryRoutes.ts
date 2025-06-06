import {Router } from "express";
import { keycloak, adminOnly } from "../middleware/keycloak";
import { CategoryController } from "../controllers/CategoryController";
const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/create", keycloak.protect(adminOnly),CategoryController.createCategory);
router.delete("/:id/delete",keycloak.protect(adminOnly), CategoryController.deleteCategory);
router.put("/:id",keycloak.protect(adminOnly), CategoryController.updateCategory);
export default router;