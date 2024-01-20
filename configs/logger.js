const winston = require("winston");
const { format, transports } = winston;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
});

module.exports = logger;
