const mongoose = require("mongoose");

// Define the ICPreference schema
const ICPreferenceSchema = new mongoose.Schema(
  {
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },
    preferenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollaborationPreference",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create ICPreference model
module.exports = mongoose.model("ICPreference", ICPreferenceSchema);
