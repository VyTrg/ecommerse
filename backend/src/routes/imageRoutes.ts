import {Router} from "express";
import {ImageController} from "../controllers/ImageController";
import { keycloak, adminOnly } from "../middleware/keycloak";
const router = Router();

router.get("/", ImageController.getAllImages);
router.get("/:id", ImageController.getImageById);
router.post("/create",keycloak.protect(adminOnly), ImageController.createImage);
router.delete("/:id/delete",keycloak.protect(adminOnly), ImageController.deleteImage);

export default router;