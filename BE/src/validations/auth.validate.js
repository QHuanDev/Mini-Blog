import yup from "yup";

export const registerValidate = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email bắt buộc"),
  username: yup
    .string()
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
    .required("Tên người dùng bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu bắt buộc"),
});

export const loginValidate = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu bắt buộc"),
});

export const verifyOTPValidate = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email bắt buộc"),
  otp: yup
    .string()
    .length(6, "Mã OTP phải có 6 ký tự")
    .required("Mã OTP bắt buộc"),
});

export const emailOnlyValidate = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email bắt buộc"),
});

export const verifyTokenValidate = yup.object({
  token: yup.string().required("Token xác thực bắt buộc"),
});

export const refreshTokenValidate = yup.object({
  refreshToken: yup.string().required("Refresh token bắt buộc"),
});
