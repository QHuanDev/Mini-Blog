import { formatYupErrors } from "../utils/formatYupErrors.js";

export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const fieldErrors = formatYupErrors(err);

    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      error: {
        code: "VALIDATION_ERROR",
        fields: fieldErrors,
      },
    });
  }

  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
