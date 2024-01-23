const mongoose = require("mongoose");

// Define the Availability schema
const availabilitySchema = new mongoose.Schema(
  {
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },
    dayOfWeek: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    timezone: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create Availability model
module.exports = mongoose.model("Availability", availabilitySchema);
