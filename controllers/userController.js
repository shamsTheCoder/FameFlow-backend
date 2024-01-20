const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { generateToken } = require("../utils/jwtUtils");

// get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(HTTP_STATUS_CODES.OK).json({ users });
});

// create or register new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST);
    throw new Error("All fields are required");
  }

  const isEmailExist = await User.exists({ email });

  if (isEmailExist) {
    res.status(HTTP_STATUS_CODES.CONFLICT);
    throw new Error("User already exists with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST);
    throw new Error("Invalid user data");
  }

  const sanitizedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res
    .status(HTTP_STATUS_CODES.OK)
    .json({ message: "User registered successfully", user: sanitizedUser });
});

// update existing user
const updateUser = asyncHandler(async (req, res) => {});

// delete existing user
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
};
