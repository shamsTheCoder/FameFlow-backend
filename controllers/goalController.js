const asyncHandler = require("express-async-handler");
const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const Goal = require("../models/GoalModel");

// get all goals
const getGoals = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const goals = await Goal.find({ userId });

    res.status(HTTP_STATUS_CODES.OK).json({
      goals,
    });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

// get single goal by id
const getGoal = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const goal = await Goal.findOne({ userId, _id: req.params.id });

    if (!goal) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND);
      throw new Error("Goal not found");
    }

    res.status(HTTP_STATUS_CODES.OK).json({ goal });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

// create goal
const setGoal = asyncHandler(async (req, res) => {
  try {
    if (!req.body.text) {
      res.status(HTTP_STATUS_CODES.BAD_REQUEST);
      throw new Error("Text field is required");
    }

    const goal = await Goal.create({
      userId: req.user.id,
      text: req.body.text,
    });

    res.status(HTTP_STATUS_CODES.CREATED).json({
      message: "Goal created successfully",
      goal,
    });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

// update existing goal
const updateGoal = asyncHandler(async (req, res) => {
  try {
    const goalId = req.params.id;
    const userId = req.user.id;

    const goal = await Goal.findOne({ userId, _id: goalId });

    if (!goal) {
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Goal not found" });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(goalId, req.body, {
      new: true,
    });

    return res.status(HTTP_STATUS_CODES.OK).json({
      message: "Goal updated successfully",
      updatedGoal,
    });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

// delete existing
const deleteGoal = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;

    const deletedGoal = await Goal.findOneAndDelete({
      userId,
      _id: req.params.id,
    });

    if (!deletedGoal) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Goal not found" });
      return;
    }

    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "Goal deleted successfully" });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
