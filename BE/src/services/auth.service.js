import User from "../models/user.model.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail, sendOTPEmail } from "./email.service.js";
import sequelize from "../config/database.js";

class AuthService {
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(userData) {
    const { email, password, username, name } = userData;

    const existingUser = await User.findOne({
      where: {
        [sequelize.Sequelize.Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error("Email đã được sử dụng");
      }
      if (existingUser.username === username) {
        throw new Error("Username đã được sử dụng");
      }
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await User.create({
      email,
      password,
      username,
      verification_token: verificationToken,
      verification_token_expires: verificationTokenExpires,
    });

    await sendVerificationEmail(email, verificationToken, username);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async verifyEmail(token) {
    const user = await User.findOne({
      where: {
        verification_token: token,
      },
    });

    if (!user) {
      throw new Error("Token xác thực không tồn tại hoặc đã hết hạn");
    }

    if (new Date() > user.verification_token_expires) {
      throw new Error("Token xác thực đã hết hạn");
    }

    user.email_verified = true;
    user.verification_token = null;
    user.verification_token_expires = null;
    await user.save();

    const authToken = this.generateToken(user.id);

    return {
      user: user.toJSON(),
      token: authToken,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    if (!user.is_active) {
      throw new Error("Tài khoản đã bị vô hiệu hóa");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    if (!user.email_verified) {
      const error = new Error("Tài khoản chưa được xác thực. Vui lòng kiểm tra email.");
      error.needVerification = true;
      throw error;
    }

    const otp = this.generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otp_expires = otpExpires;
    await user.save();

    await sendOTPEmail(email, otp, user.username);

    return {
      email: user.email,
      requireOTP: true,
    };
  }

  async verifyOTP(email, otp) {
    const now = new Date(); 
    const user = await User.findOne({
      where: {
        email,
        otp,
        otp_expires: {
          [Op.gt]: now,
        },
      },
    });

    if (!user) {
      const expiredUser = await User.findOne({ where: { email, otp } });
      if (expiredUser && expiredUser.otp_expires < now) {
        throw new Error("Mã OTP đã hết hạn");
      }
      if (expiredUser && expiredUser.otp !== otp) {
        throw new Error("Mã OTP không đúng");
      }
      throw new Error("Mã OTP không hợp lệ hoặc người dùng không tồn tại");
    }

    user.otp = null;
    user.otp_expires = null;
    user.last_login = new Date();
    await user.save();

    const token = this.generateToken(user.id);

    return {
      user: user.toJSON(),
      token,
    };
  }

  async resendVerification(email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    if (user.email_verified) {
      throw new Error("Tài khoản đã được xác thực");
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verification_token = verificationToken;
    user.verification_token_expires = verificationTokenExpires;
    await user.save();

    await sendVerificationEmail(email, verificationToken, user.username);

    return true;
  }

  async resendOTP(email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    if (!user.email_verified) {
      throw new Error("Tài khoản chưa được xác thực");
    }

    const otp = this.generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otp_expires = otpExpires;
    await user.save();

    await sendOTPEmail(email, otp, user.username);

    return true;
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    return user.toJSON();
  }
}

export default new AuthService();