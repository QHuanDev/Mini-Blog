import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

export const sendVerificationEmail = async (email, token, name) => {
  // const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const verificationUrl = `http://localhost:${process.env.PORT}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"${process.env.APP_NAME || "Blog"}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Xác thực tài khoản của bạn tại Blog",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0F172A; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; }
          .button { display: inline-block; padding: 12px 30px; background: #0F172A; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Chào mừng đến với ${process.env.APP_NAME || "Blog"}!</h1>
          </div>
          <div class="content">
            <h2>Xin chào ${name},</h2>
            <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấn vào nút bên dưới để xác thực email của bạn:</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Kích hoạt tài khoản</a>
            </div>
            <p>Link này sẽ hết hạn sau 24 giờ.</p>
            <p>Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 ${
              process.env.APP_NAME || "Blog"
            }. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"${process.env.APP_NAME || "Blog"}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Mã OTP đăng nhập Blog",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; }
          .otp-code { font-size: 32px; font-weight: bold; color: #2196F3; text-align: center; letter-spacing: 8px; padding: 20px; background: white; border: 2px dashed #2196F3; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Mã xác thực đăng nhập</h1>
          </div>
          <div class="content">
            <h2>Xin chào ${name},</h2>
            <p>Mã OTP của bạn để đăng nhập là:</p>
            <div class="otp-code">${otp}</div>
            <p><strong>Mã này sẽ hết hạn sau 5 phút.</strong></p>
            <p>Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
            <p>Nếu bạn không yêu cầu đăng nhập, vui lòng bỏ qua email này và bảo mật tài khoản của bạn.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 ${
              process.env.APP_NAME || "Blog"
            }. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default transporter;
