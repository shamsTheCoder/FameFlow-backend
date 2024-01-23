const mongoose = require("mongoose");

// Define the InfluencerCategory schema
const influencerCategorySchema = new mongoose.Schema(
  {
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create InfluencerCategory model
module.exports = mongoose.model("InfluencerCategory", influencerCategorySchema);
