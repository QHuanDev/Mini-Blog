import express from "express";
import {
  register,
  verifyEmail,
  login,
  verifyOTP,
  resendVerification,
  resendOTP,
  getMe,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.get("/verify-email", verifyEmail);

router.post("/resend-verification", resendVerification);

router.post("/login", login);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.get("/me", authenticate, getMe);

export default router;