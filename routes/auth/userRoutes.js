const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/authMiddleware");

const {
  updateUser,
  deleteUser,
  getUsers,
} = require("../../controllers/auth/userController");

// Routes that require authentication
router.get("/", protect, getUsers);
router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
