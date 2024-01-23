const mongoose = require("mongoose");

// Define the Collaboration schema
const collaborationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },
    collaborationType: { type: String },
    bookingDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Canceled"],
      default: "Pending",
    },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  },
  {
    timestamps: true,
  }
);

// Create Collaboration model
module.exports = mongoose.model("Collaboration", collaborationSchema);
