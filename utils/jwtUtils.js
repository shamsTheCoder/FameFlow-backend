const jwt = require("jsonwebtoken");
require("dotenv").config();

let tokenBlackList = [];

// generate token
const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = "30d";
  const token = jwt.sign({ userId }, secretKey, { expiresIn });
  return token;
};

// Function to add a token to the blacklist
const addToBlackList = (token) => {
  tokenBlackList.push(token);
};

// Function to check if a token is blacklisted
const isTokenBlackListed = (token) => {
  return tokenBlackList.includes(token);
};

module.exports = {
  generateToken,
  addToBlackList,
  isTokenBlackListed,
};
