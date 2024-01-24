const express = require("express");

const setupRoutes = (app) => {
  // Render home page
  app.get("/", (req, res) => {
    res.render("index");
  });

  // Authentication Routes
  app.use("/api/auth", require("./auth/authRoutes"));

  // Goals Routes
  app.use("/api/goals", require("./goalRoutes"));

  // Users Routes
  app.use("/api/users", require("./auth/userRoutes"));

  // Roles Routes
  app.use("/api/roles", require("./auth/roleRoutes"));

  // Permissions Routes
  app.use("/api/permissions", require("./auth/permissionRoutes"));

  // Render home page
  app.get("/", (req, res) => {
    res.render("index");
  });
};

module.exports = setupRoutes;
