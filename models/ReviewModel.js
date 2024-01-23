const mongoose = require("mongoose");

// Define the Review schema
const reviewSchema = new mongoose.Schema(
  {
    collaborationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collaboration",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create Review model
module.exports = mongoose.model("Review", reviewSchema);
