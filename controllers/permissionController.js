const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const Permission = require("../models/permissionModel");
const asyncHandler = require("express-async-handler");

// get all permissions
const getPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.find();

  res.status(HTTP_STATUS_CODES.OK).json({ permissions });
});

// get single permission by id
const getPermission = asyncHandler(async (req, res) => {
  const permission = await Permission.findById(req.params.id);

  if (!permission) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND);
    throw new Error("Permission not found");
  }

  res.status(HTTP_STATUS_CODES.OK).json({ permission });
});

// create permission
const createPermission = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body;

  try {
    const permission = await Permission.create({
      name,
      slug,
      description,
    });

    res.status(HTTP_STATUS_CODES.CREATED).json({ permission });
  } catch (error) {
    if (error.code === HTTP_STATUS_CODES.RECORD_EXISTS) {
      res
        .status(HTTP_STATUS_CODES.CONFLICT)
        .json({ error: "Role with the same name or slug already exists" });
    } else {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: "Error creating role" });
    }
  }
});

// update an existing permission by id
const updatePermission = asyncHandler(async (req, res) => {});

// delete an existing permission by id
const deletePermission = asyncHandler(async (req, res) => {});

module.exports = {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
};
