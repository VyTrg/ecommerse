import { Router } from "express";
import { createSize, deleteSize, getSizes } from "../controllers/SizeController";
import { keycloak, adminOnly } from "../middleware/keycloak";
const router = Router();

router.get("/", getSizes);
router.post("/", keycloak.protect(adminOnly),createSize);
router.delete("/:id",keycloak.protect(adminOnly), deleteSize);

export default router;
