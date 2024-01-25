const logger = require("../configs/loggerConfig");
const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  const statusCode = res.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.APP_MODE === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
