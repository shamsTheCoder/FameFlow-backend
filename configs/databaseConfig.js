const mongoose = require("mongoose");
const logger = require("./loggerConfig");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MOGODB_URI);
    console.log(`Database connected at ${conn.connection.host}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
