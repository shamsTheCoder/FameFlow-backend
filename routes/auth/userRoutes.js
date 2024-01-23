const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");

const {
  registerUser,
  updateUser,
  deleteUser,
  getUsers,
} = require("../../controllers/auth/userController");

// Open route without authentication
router.post("/register", upload.single("profilePicture"), registerUser);

// Routes that require authentication
router.get("/", protect, getUsers);
router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
