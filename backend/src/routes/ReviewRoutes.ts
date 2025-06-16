import { Router } from "express";
import { createReview, deleteReview, getReviews } from "../controllers/ReviewController";
import { keycloak, adminOnly } from "../middleware/keycloak";
const router = Router();

router.get("/", getReviews);
router.post("/", keycloak.protect(adminOnly),createReview);
router.delete("/:id", keycloak.protect(adminOnly),deleteReview);

export default router;
