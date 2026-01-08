import { Router } from "express";
import authRoutes from "./auth.route.js";
import postRoutes from "./post.route.js";
const router = Router();
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export default router;
