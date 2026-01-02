import jwt from "jsonwebtoken";

/**
 * Tạo Access Token (thời hạn ngắn - 15 phút)
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId, type: "access" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  });
};

/**
 * Tạo Refresh Token (thời hạn dài - 7 ngày)
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId, type: "refresh" },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }
  );
};

/**
 * Tạo cả Access Token và Refresh Token
 */
export const generateTokens = (userId) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};

/**
 * Xác thực Access Token
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Xác thực Refresh Token
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
  );
};

/**
 * Tính thời gian hết hạn của Refresh Token (dạng Date)
 */
export const getRefreshTokenExpiry = () => {
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // default 7 days

  const value = parseInt(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() + value * multipliers[unit]);
};
