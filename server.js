const express = require("express");
require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./configs/db");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes setup
app.use("/api", require("./routes/authRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/permissions", require("./routes/permissionRoutes"));

// error handler middleware
app.use(errorHandler);

// DB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
