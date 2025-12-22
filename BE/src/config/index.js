import morganMiddleware from "./morgan.js";
import rateLimiter from "./rateLimit.js";
import securityMiddleware from "./security.js";

const configMiddleware = (app) => {
  app.use(securityMiddleware);
  app.use(morganMiddleware);
  app.use(rateLimiter);
};

export default configMiddleware;
