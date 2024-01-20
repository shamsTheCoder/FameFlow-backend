const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  loginUser,
  logoutUser,
  getMe,
  resetPassword,
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post("/reset-password", resetPassword);

router.get("/profile", protect, getMe);

module.exports = router;
