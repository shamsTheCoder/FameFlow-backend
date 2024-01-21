const asyncHandler = require("express-async-handler");
const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const bcrypt = require("bcrypt");
const { generateToken, addToBlackList } = require("../utils/jwtUtils");
const User = require("../models/userModel");

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND);
    throw new Error("Email does not exist!");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST);
    throw new Error("Wrong password");
  }

  const sanitizedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };

  res
    .status(HTTP_STATUS_CODES.OK)
    .json({ message: "Logged in successfully", user: sanitizedUser });
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  addToBlackList(token);

  res.status(HTTP_STATUS_CODES.OK).json({ message: "Logged out successfully" });
});

// get logged-in user info
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("role");

  res.status(HTTP_STATUS_CODES.OK).json({ user });
});

const resetPassword = asyncHandler(async (req, res) => {
  res
    .status(HTTP_STATUS_CODES.OK)
    .json({ message: "Password reset successfully" });
});

module.exports = {
  loginUser,
  logoutUser,
  getMe,
  resetPassword,
};
