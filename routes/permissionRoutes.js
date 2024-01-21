const express = require("express");
const router = express.Router();
const {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} = require("../controllers/permissionController");

router.get("/", getPermissions);
router.get("/:id", getPermission);
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

module.exports = router;
