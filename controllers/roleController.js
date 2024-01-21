const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const Role = require("../models/roleModel");
const asyncHandler = require("express-async-handler");

// get all roles
const getRoles = asyncHandler(async (req, res) => {
  console.log("hello");
  const roles = await Role.find();
  res.status(HTTP_STATUS_CODES.OK).json({ roles });
});

// get single role by Id
const getRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND);
    throw new Error("Role not found");
  }

  res.status(HTTP_STATUS_CODES.OK).json({ role });
});

// create role
const createRole = asyncHandler(async (req, res) => {
  try {
    const { name, slug, permissions } = req.body;

    const role = await Role.create({
      name,
      slug,
      permissions,
    });

    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: "Role created successfully", role });
  } catch (error) {
    if (error.code === HTTP_STATUS_CODES.RECORD_EXISTS) {
      // Duplicate key error (name is not unique)
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

// update an existing role
const updateRole = asyncHandler(async (req, res) => {
  const { name, slug, permissions } = req.body;

  const role = await Role.findById(req.params.id);

  if (!role) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND);
    throw new Error("Role not found");
  }

  role.name = name;
  role.slug = slug;
  role.permissions = permissions;

  await role.save();

  res
    .status(HTTP_STATUS_CODES.OK)
    .json({ message: "Role updated successfully", role });
});

// delete an existing role
const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND);
    throw new Error("Role not found");
  }

  await role.remove();

  res
    .status(HTTP_STATUS_CODES.OK)
    .json({ message: "Role deleted successfully" });
});

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
