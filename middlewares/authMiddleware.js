const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const { isTokenBlackListed } = require("../utils/jwtUtils");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from request header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // check if token is not in blacklist
      if (isTokenBlackListed(token)) {
        return res
          .status(HTTP_STATUS_CODES.UNAUTHORIZED)
          .json({ message: "Unauthorized - Token is blacklisted" });
      }

      //   get user from the token
      req.user = await User.findById(decodedToken.userId);

      next();
    } catch (error) {
      console.log(error);
      res.status(HTTP_STATUS_CODES.UNAUTHORIZED);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(HTTP_STATUS_CODES.UNAUTHORIZED);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
