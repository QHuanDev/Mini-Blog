import ErrorCodes from "../constants/error-code.js";
import MESSAGE from "../constants/message.js";

const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    // Yup ValidationError
    if (err.name === "ValidationError") {
      const fieldErrors = formatYupErrors(err);

      return res.status(400).json({
        success: false,
        message: MESSAGE.COMMON.VALIDATION_ERROR,
        error: {
          code: ErrorCodes.VALIDATION_ERROR,
          fields: fieldErrors,
        },
      });
    }

    // Custom ServiceError
    if (err.name === "ServiceError") {
      return res.status(err.status || 400).json({
        success: false,
        message: err.message,
        error: {
          code: err.code,
          ...(err.details && { details: err.details }),
        },
        ...(err.needVerification && { needVerification: true }),
      });
    }

    // JWT Errors
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: MESSAGE.COMMON.TOKEN_INVALID,
        error: { code: ErrorCodes.TOKEN_INVALID },
      });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: MESSAGE.COMMON.TOKEN_EXPIRED,
        error: { code: ErrorCodes.TOKEN_EXPIRED },
      });
    }

    // Sequelize Errors
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: MESSAGE.COMMON.CONFLICT,
        error: { code: ErrorCodes.CONFLICT },
      });
    }

    // Default Error
    console.error("Error:", err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || MESSAGE.COMMON.SERVER_ERROR,
      error: { code: ErrorCodes.SERVER_ERROR },
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  });
};

export default handleAsync;
