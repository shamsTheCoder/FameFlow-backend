const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
});

module.exports = mongoose.model("Permission", permissionSchema);
