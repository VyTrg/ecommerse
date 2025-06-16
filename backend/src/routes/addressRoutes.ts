import {Router } from "express";
import { AddressController } from "../controllers/AddressController";

const router = Router();
router.get("/:userId", AddressController.getAddressesByUserId);
router.post("", AddressController.create);
router.put("/:id", AddressController.update);
router.delete(":id", AddressController.delete);

export default router;