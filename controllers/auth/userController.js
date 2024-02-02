require("dotenv").config();

const HTTP_STATUS_CODES = require("../../constants/httpStatusCodes");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../../utils/jwtUtils");
const ROLES = require("../../constants/userRoles");
const User = require("../../models/userModel");

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
  updateUser,
  deleteUser,
};
