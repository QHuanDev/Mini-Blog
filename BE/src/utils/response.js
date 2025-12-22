export const success = (res, message = "Thành công", data = {}) => {
  return res.json({ status: "success", message, data });
};

export const serverError = (
  res,
  message = "Lỗi hệ thống, vui lòng thử lại sau"
) => {
  return res
    .status(500)
    .json({ status: "error", message, error: { code: "SERVER_ERROR" } });
};

export const validationError = (res, message = "Lỗi dữ liệu", errors = {}) => {
  return res.status(400).json({ status: "error", message, errors });
};

export const businessError = (
  res,
  message = "Có lỗi nghiệp vụ",
  code = "BUSINESS_ERROR",
  details = null,
  statusCode = 400
) => {
  return res
    .status(statusCode)
    .json({ status: "error", message, error: { code, details } });
};
