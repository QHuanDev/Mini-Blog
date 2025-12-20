import authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp đầy đủ thông tin (email, password, username)",
      });
    }

    const result = await authService.register({ email, password, username });

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
      data: result.user,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Đã có lỗi xảy ra khi đăng ký",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token xác thực không hợp lệ",
      });
    }

    const result = await authService.verifyEmail(token);

    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8" />
      <title>Xác thực email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f6f8;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .box {
          background: white;
          padding: 40px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #0F172A;
        }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>Xác thực email thành công</h1>
        <p>Tài khoản của bạn đã được kích hoạt.</p>
        <p>Bạn có thể đóng trang này hoặc đăng nhập.</p>
      </div>
    </body>
    </html>
    `);

  } catch (error) {
    console.error("Verify email error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Đã có lỗi xảy ra khi xác thực email",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp email và mật khẩu",
      });
    }

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Mã OTP đã được gửi đến email của bạn",
      data: result,
    });
  } catch (error) {
    console.error("Login error:", error);
    
    const status = error.needVerification ? 403 : 401;
    
    res.status(status).json({
      success: false,
      message: error.message || "Đã có lỗi xảy ra khi đăng nhập",
      needVerification: error.needVerification || false,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp email và mã OTP",
      });
    }

    const result = await authService.verifyOTP(email, otp);

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      data: result,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Đã có lỗi xảy ra khi xác thực OTP",
    });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp email",
      });
    }

    await authService.resendVerification(email);

    res.status(200).json({
      success: true,
      message: "Email xác thực đã được gửi lại",
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Đã có lỗi xảy ra khi gửi lại email xác thực",
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp email",
      });
    }

    await authService.resendOTP(email);

    res.status(200).json({
      success: true,
      message: "Mã OTP mới đã được gửi",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Đã có lỗi xảy ra khi gửi lại mã OTP",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra",
    });
  }
};