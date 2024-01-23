const mongoose = require("mongoose");

// Define the Link schema
const linkSchema = new mongoose.Schema(
  {
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },
    platform: { type: String, required: true },
    url: { type: String, required: true },
    iconClass: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create Link model
module.exports = mongoose.model("SocialLink", linkSchema);
