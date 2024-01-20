const asyncHandler = require("express-async-handler");
const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const Goal = require("../models/goalModels");

// get all goals
const getGoals = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const goals = await Goal.find({ userId });

  res.status(HTTP_STATUS_CODES.OK).json({
    goals,
  });
});

// get single goal by id
const getGoal = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const goal = await Goal.findOne({ userId, _id: req.params.id });

  if (!goal) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND);
    throw new Error("Goal not found");
  }

  res.status(HTTP_STATUS_CODES.OK).json({ goal });
});

// create goal
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST);
    throw new Error("Text field is required");
  }

  const goal = await Goal.create({
    userId: req.user.id,
    text: req.body.text,
  });

  res.status(HTTP_STATUS_CODES.OK).json({
    message: "Goal created successfully",
    goal,
  });
});

// update existing goal
const updateGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const userId = req.user.id;

  const goal = await Goal.findOne({ userId, _id: goalId });

  if (!goal) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goalId, req.body, {
    new: true,
  });

  res.status(HTTP_STATUS_CODES.OK).json({
    message: "Goal updated successfully",
    updatedGoal,
  });
});

// delete existing
const deleteGoal = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const deletedGoal = await Goal.findOneAndDelete({
    userId,
    _id: req.params.id,
  });

  if (!deletedGoal) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND);
    throw new Error("Goal not found");
  }

  res
    .status(200)
    .json({ message: "Goal deleted successfully", deletedId: req.params.id });
});

module.exports = {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
