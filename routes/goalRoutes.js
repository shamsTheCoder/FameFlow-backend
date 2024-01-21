const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { checkPermissions } = require("../middlewares/rbacMiddleware");
const {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// Routes
router
  .route("/")
  .post(protect, checkPermissions(["create"]), setGoal)
  .get(protect, checkPermissions(["read"]), getGoals);

router
  .route("/:id")
  .get(protect, checkPermissions(["read"]), getGoal)
  .put(protect, checkPermissions(["update"]), updateGoal)
  .delete(protect, checkPermissions(["delete"]), deleteGoal);

module.exports = router;
