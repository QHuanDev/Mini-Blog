class ServiceError extends Error {
  constructor(
    message,
    code = ErrorCodes.SERVER_ERROR,
    status = 400,
    details = null
  ) {
    super(message);
    this.name = "ServiceError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export default ServiceError;
