const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");

const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  resetPassword,
} = require("../../controllers/auth/authController");

router.post("/register", upload.single("profilePicture"), registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);

router.post("/logout", protect, logoutUser);

router.get("/profile", protect, getMe);

module.exports = router;
