import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  verifyOTP,
  resendVerification,
  resendOTP,
  getMe,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const AuthRouter = Router();

AuthRouter.post("/register", register);

AuthRouter.get("/verify-email", verifyEmail);

AuthRouter.post("/resend-verification", resendVerification);

AuthRouter.post("/login", login);

AuthRouter.post("/verify-otp", verifyOTP);

AuthRouter.post("/resend-otp", resendOTP);

AuthRouter.post("/refresh-token", refreshToken);

AuthRouter.post("/logout", logout);

AuthRouter.get("/me", authenticate, getMe);

export default AuthRouter;
