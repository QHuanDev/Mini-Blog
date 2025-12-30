import authService from "../services/auth.service.js";
import handleAsync from "../middleware/handleAsync.js";
import {
  registerValidate,
  loginValidate,
  verifyOTPValidate,
  emailOnlyValidate,
  verifyTokenValidate,
} from "../validations/auth.validate.js";
import MESSAGE from "../constants/message.js";
import { Response } from "../utils/createResponse.js";

/**
 * POST /api/auth/register
 */
export const register = handleAsync(async (req, res) => {
  await registerValidate.validate(req.body, { abortEarly: false });

  const { email, password, username } = req.body;
  const result = await authService.register({ email, password, username });

  return Response(
    res,
    `${MESSAGE.AUTH.REGISTER_SUCCESS}. ${MESSAGE.AUTH.CHECK_EMAIL}`,
    result
  );
});

/**
 * GET /api/auth/verify-email?token=xxx
 */
export const verifyEmail = handleAsync(async (req, res) => {
  await verifyTokenValidate.validate(req.query, { abortEarly: false });

  const { token } = req.query;
  const result = await authService.verifyEmail(token);

  return Response(res, MESSAGE.VERIFY.VERIFIED, result);
});

/**
 * POST /api/auth/login
 */
export const login = handleAsync(async (req, res) => {
  await loginValidate.validate(req.body, { abortEarly: false });

  const { email, password } = req.body;
  const result = await authService.login(email, password);

  return Response(res, MESSAGE.AUTH.LOGIN_SUCCESS, result);
});

/**
 * POST /api/auth/verify-otp
 */
export const verifyOTP = handleAsync(async (req, res) => {
  await verifyOTPValidate.validate(req.body, { abortEarly: false });

  const { email, otp } = req.body;
  const result = await authService.verifyOTP(email, otp);

  return Response(res, MESSAGE.AUTH.VERIFY_OTP_SUCCESS, result);
});

/**
 * POST /api/auth/resend-verification
 */
export const resendVerification = handleAsync(async (req, res) => {
  await emailOnlyValidate.validate(req.body, { abortEarly: false });

  const { email } = req.body;
  await authService.resendVerification(email);

  return Response(res, MESSAGE.AUTH.RESEND_VERIFICATION_SUCCESS);
});

/**
 * POST /api/auth/resend-otp
 */
export const resendOTP = handleAsync(async (req, res) => {
  await emailOnlyValidate.validate(req.body, { abortEarly: false });

  const { email } = req.body;
  await authService.resendOTP(email);

  return Response(res, MESSAGE.AUTH.RESEND_OTP_SUCCESS);
});

/**
 * GET /api/auth/me
 */
export const getMe = handleAsync(async (req, res) => {
  return Response(res, MESSAGE.AUTH.GET_ME_SUCCESS, {
    user: req.user,
  });
});
