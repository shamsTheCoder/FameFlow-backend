const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/authMiddleware");

const {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../../controllers/auth/roleController");

router.route("/").post(protect, createRole).get(protect, getRoles);

router
  .route("/:id")
  .get(protect, getRole)
  .put(protect, updateRole)
  .delete(protect, deleteRole);

module.exports = router;
