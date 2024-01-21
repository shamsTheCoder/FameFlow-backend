const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      validate: {
        validator: async function (value) {
          const permission = await mongoose
            .model("Permission")
            .findOne({ _id: value });
          return !!permission;
        },
        message: "Invalid permission ID",
      },
    },
  ],
});

module.exports = mongoose.model("Role", roleSchema);
