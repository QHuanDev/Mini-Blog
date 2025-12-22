class ServiceError extends Error {
  constructor(message, code, status = 400, details = null) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export default ServiceError;
