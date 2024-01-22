const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { generateToken } = require("../utils/jwtUtils");
const ROLES = require("../constants/userRoles");

// get all users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().populate("role");
    res.status(HTTP_STATUS_CODES.OK).json({ users });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

// create or register new user
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const profilePicture = req.file;

    // Check if the file is a valid image
    if (!profilePicture.mimetype.startsWith("image/")) {
      res.status(HTTP_STATUS_CODES.BAD_REQUEST);
      throw new Error("Invalid file type. Only image files are allowed.");
    }

    const uploadedProfilePicUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/images/${profilePicture.filename}`;

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
      role,
      profilePicture: uploadedProfilePicUrl,
    });

    if (!user) {
      res.status(HTTP_STATUS_CODES.BAD_REQUEST);
      throw new Error("Invalid user data");
    }

    const sanitizedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: "User registered successfully", user: sanitizedUser });
  } catch (error) {
    next(error);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

// update existing user
const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedUserId = req.params.id;

    // Check if the authenticated user is updating their own information
    if (userId !== updatedUserId) {
      res.status(HTTP_STATUS_CODES.UNAUTHORIZED);
      throw new Error("Unauthorized: You can only update your own information");
    }

    const updatedUser = await User.findByIdAndUpdate(updatedUserId, req.body);

    if (!updatedUser) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND);
      throw new Error("User not found");
    }

    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "User data updated successfully", updatedUser });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

// delete existing user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    // Implement delete logic here
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
};
