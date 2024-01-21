const ROLES = {
  admin: ["create", "read", "update", "delete"],
  user: ["read"],
  manager: ["create", "read", "update"],
};

module.exports = ROLES;
