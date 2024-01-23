const mongoose = require("mongoose");

const influencerProfileSchema = new mongoose.Schema(
  {
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profilePicture: { type: String, required: true },
    bio: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    portfolio: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InfluencerProfile", influencerProfileSchema);
