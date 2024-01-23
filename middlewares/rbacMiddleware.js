const HTTP_STATUS_CODES = require("../constants/httpStatusCodes");
const User = require("../models/UserModel");
const Permission = require("../models/permissionModel");

const checkPermissions = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate("role");

      const userPermissions = await Promise.all(
        user.role.permissions.map(async (permission) => {
          const permissionDocument = await Permission.findById(permission);
          return permissionDocument.name;
        })
      );

      const hasPermission = requiredPermissions.every((permission) => {
        return userPermissions.includes(permission);
      });

      if (!hasPermission) {
        res.status(HTTP_STATUS_CODES.FORBIDDEN);
        throw new Error("Insufficient permissions");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { checkPermissions };
