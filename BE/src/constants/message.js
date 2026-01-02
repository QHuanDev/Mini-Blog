const MESSAGE = {
  AUTH: {
    REGISTER_SUCCESS: "Đăng ký thành công",
    LOGIN_SUCCESS: "Đăng nhập thành công",
    RESEND_VERIFICATION_SUCCESS: "Email xác thực đã được gửi lại",
    RESEND_OTP_SUCCESS: "Mã OTP mới đã được gửi",
    GET_ME_SUCCESS: "Lấy thông tin người dùng thành công",
    VERIFY_OTP_SUCCESS: "Xác thực OTP thành công",
    REFRESH_TOKEN_SUCCESS: "Làm mới token thành công",
    LOGOUT_SUCCESS: "Đăng xuất thành công",
    REGISTER_FAILED: "Đăng ký thất bại",
    LOGIN_FAILED: "Email hoặc mật khẩu không đúng",
    UNAUTHORIZED: "Bạn chưa đăng nhập",
    CHECK_EMAIL: "Vui lòng kiểm tra email",
  },

  USER: {
    NOT_FOUND: "Không tìm thấy người dùng",
    EMAIL_EXISTS: "Email đã tồn tại",
    USERNAME_EXISTS: "Username đã tồn tại",
    CREATE_SUCCESS: "Tạo người dùng thành công",
  },

  VERIFY: {
    EMAIL_SENT: "Email xác thực đã được gửi",
    INVALID_TOKEN: "Token không hợp lệ",
    TOKEN_EXPIRED: "Token đã hết hạn",
    VERIFIED: "Xác thực email thành công",
  },

  COMMON: {
    VALIDATION_ERROR: "Dữ liệu không hợp lệ",
    TOKEN_INVALID: "Token không hợp lệ",
    TOKEN_EXPIRED: "Token đã hết hạn",
    CONFLICT: "Dữ liệu đã tồn tại",
    SERVER_ERROR: "Lỗi hệ thống",
    FORBIDDEN: "Bạn không có quyền truy cập",
  },
};

export default MESSAGE;
