import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import crypto from "crypto";
import { sendVerificationEmail, sendOTPEmail } from "./email.service.js";
import ServiceError from "../utils/createErrors.js";
import MESSAGE from "../constants/message.js";
import ErrorCodes from "../constants/error-code.js";
import {
  generateTokens,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} from "../utils/jwt.utils.js";

class AuthService {
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateVerificationToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Tạo session mới trong database
   */
  async createSession(userId, refreshToken, metadata = {}) {
    const expiresAt = getRefreshTokenExpiry();
    return await Session.createSession(
      userId,
      refreshToken,
      expiresAt,
      metadata
    );
  }

  async register(userData) {
    const { email, password, username } = userData;

    const existingUser = await User.findByEmailOrUsername(email, username);

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ServiceError(
          MESSAGE.USER.EMAIL_EXISTS,
          ErrorCodes.CONFLICT,
          409,
          "Email đã tồn tại"
        );
      }
      if (existingUser.username === username) {
        throw new ServiceError(
          MESSAGE.USER.USERNAME_EXISTS,
          ErrorCodes.CONFLICT,
          409,
          "Username đã tồn tại"
        );
      }
    }

    const verificationToken = this.generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await User.createWithVerification(
      { email, password, username },
      verificationToken,
      verificationTokenExpires
    );

    await sendVerificationEmail(email, verificationToken, username);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        token: verificationToken,
      },
    };
  }

  async verifyEmail(token) {
    const user = await User.findByVerificationToken(token);

    if (!user) {
      throw new ServiceError(
        MESSAGE.VERIFY.INVALID_TOKEN,
        ErrorCodes.TOKEN_INVALID,
        401,
        "Token xác thực không tồn tại hoặc đã hết hạn"
      );
    }

    if (new Date() > user.verification_token_expires) {
      throw new ServiceError(
        MESSAGE.VERIFY.TOKEN_EXPIRED,
        ErrorCodes.TOKEN_EXPIRED,
        401,
        "Token xác thực đã hết hạn"
      );
    }

    await user.verifyEmail();

    const tokens = generateTokens(user.id);
    await this.createSession(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      ...tokens,
    };
  }

  async login(email, password) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new ServiceError(
        MESSAGE.AUTH.LOGIN_FAILED,
        ErrorCodes.AUTHENTICATION_ERROR,
        401,
        "Email hoặc mật khẩu không đúng"
      );
    }

    if (!user.is_active) {
      throw new ServiceError(
        MESSAGE.AUTH.ACCOUNT_DISABLED,
        ErrorCodes.ACCOUNT_DISABLED,
        403,
        "Tài khoản đã bị vô hiệu hóa"
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new ServiceError(
        MESSAGE.AUTH.LOGIN_FAILED,
        ErrorCodes.AUTHENTICATION_ERROR,
        401,
        "Email hoặc mật khẩu không đúng"
      );
    }

    if (!user.email_verified) {
      throw new ServiceError(
        MESSAGE.AUTH.EMAIL_NOT_VERIFIED,
        ErrorCodes.EMAIL_NOT_VERIFIED,
        401,
        "Tài khoản chưa được xác thực. Vui lòng kiểm tra email."
      );
    }

    const otp = this.generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.setOTP(otp, otpExpires);

    await sendOTPEmail(email, otp, user.username);

    return {
      email: user.email,
      requireOTP: true,
      otp
    };
  }

  async verifyOTP(email, otp) {
    const user = await User.findByValidOTP(email, otp);

    if (!user) {
      const expiredUser = await User.findByEmailAndOTP(email, otp);

      if (expiredUser && expiredUser.otp_expires < new Date()) {
        throw new ServiceError(
          MESSAGE.AUTH.OTP_EXPIRED,
          ErrorCodes.OTP_EXPIRED,
          401,
          "Mã OTP đã hết hạn"
        );
      }
      if (expiredUser && expiredUser.otp !== otp) {
        throw new ServiceError(
          MESSAGE.AUTH.OTP_INVALID,
          ErrorCodes.OTP_INVALID,
          401,
          "Mã OTP không đúng"
        );
      }
      throw new ServiceError(
        "Mã OTP không hợp lệ hoặc người dùng không tồn tại",
        ErrorCodes.OTP_INVALID,
        401,
        "Mã OTP không hợp lệ"
      );
    }
    await user.clearOTPAndLogin();
    const tokens = generateTokens(user.id);
    await this.createSession(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      ...tokens,
    };
  }

  async resendVerification(email) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new ServiceError(
        MESSAGE.AUTH.USER_NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND,
        404,
        "Người dùng không tồn tại"
      );
    }

    if (user.email_verified) {
      throw new ServiceError(
        MESSAGE.AUTH.ACCOUNT_ALREADY_VERIFIED,
        ErrorCodes.ACCOUNT_ALREADY_VERIFIED,
        400,
        "Tài khoản đã được xác thực"
      );
    }

    const verificationToken = this.generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await user.updateVerificationToken(
      verificationToken,
      verificationTokenExpires
    );

    await sendVerificationEmail(email, verificationToken, user.username);

    return true;
  }

  async resendOTP(email) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new ServiceError(
        MESSAGE.AUTH.USER_NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND,
        404,
        "Người dùng không tồn tại"
      );
    }

    if (!user.email_verified) {
      throw new ServiceError(
        MESSAGE.AUTH.EMAIL_NOT_VERIFIED,
        ErrorCodes.EMAIL_NOT_VERIFIED,
        401,
        "Tài khoản chưa được xác thực. Vui lòng kiểm tra email."
      );
    }

    const otp = this.generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.setOTP(otp, otpExpires);

    await sendOTPEmail(email, otp, user.username);

    return true;
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new ServiceError(
        MESSAGE.AUTH.USER_NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND,
        404,
        "Người dùng không tồn tại"
      );
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      is_active: user.is_active,
      email_verified: user.email_verified,
    };
  }

  async refreshToken(refreshTokenValue) {
    try {
      const decoded = verifyRefreshToken(refreshTokenValue);

      const session = await Session.findByRefreshToken(refreshTokenValue);

      if (!session) {
        throw new ServiceError(
          "Session không tồn tại hoặc đã hết hạn",
          ErrorCodes.TOKEN_INVALID,
          401,
          "Refresh token không hợp lệ"
        );
      }

      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw new ServiceError(
          MESSAGE.AUTH.USER_NOT_FOUND,
          ErrorCodes.USER_NOT_FOUND,
          404,
          "Người dùng không tồn tại"
        );
      }

      if (!user.is_active) {
        throw new ServiceError(
          MESSAGE.AUTH.ACCOUNT_DISABLED,
          ErrorCodes.ACCOUNT_DISABLED,
          403,
          "Tài khoản đã bị vô hiệu hóa"
        );
      }

      // Revoke old session
      await session.revoke();

      // Generate new tokens
      const tokens = generateTokens(user.id);
      await this.createSession(user.id, tokens.refreshToken);

      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        ...tokens,
      };
    } catch (error) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        throw new ServiceError(
          "Refresh token không hợp lệ hoặc đã hết hạn",
          ErrorCodes.TOKEN_INVALID,
          401,
          "Refresh token không hợp lệ"
        );
      }
      throw error;
    }
  }

  async logout(refreshToken) {
    await Session.revokeToken(refreshToken);
    return true;
  }
}

export default new AuthService();
