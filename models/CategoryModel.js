const mongoose = require("mongoose");

// Define the Category schema
const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

// Create Category model
module.exports = mongoose.model("Category", categorySchema);
