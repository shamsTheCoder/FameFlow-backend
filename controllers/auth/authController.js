const asyncHandler = require("express-async-handler");
const HTTP_STATUS_CODES = require("../../constants/httpStatusCodes");
const bcrypt = require("bcrypt");
const { generateToken, addToBlackList } = require("../../utils/jwtUtils");
const User = require("../../models/UserModel");

// create or register new user
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, mobile, password, role, status } = req.body;

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
      mobile,
      password,
      role,
      status,
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
      mobile: user.mobile,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
      status: user.status,
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
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  resetPassword,
};
