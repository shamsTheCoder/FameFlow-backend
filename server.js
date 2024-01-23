const express = require("express");
require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./configs/db");
const setupRoutes = require("./routes/routeSetup");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes setup
setupRoutes(app);

// Error handler middleware
app.use(errorHandler);

// DB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
