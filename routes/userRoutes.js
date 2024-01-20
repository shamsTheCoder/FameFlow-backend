const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");

// Open route without authentication
router.post("/register", registerUser);

// Routes that require authentication
router.get("/", protect, getUsers);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
