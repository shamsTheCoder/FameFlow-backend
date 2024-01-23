const mongoose = require("mongoose");

// Define the Preference schema
const preferenceSchema = new mongoose.Schema(
  {
    preferenceName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create Preference model
module.exports = mongoose.model("Preference", preferenceSchema);
