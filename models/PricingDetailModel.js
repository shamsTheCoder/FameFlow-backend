const mongoose = require("mongoose");

// Define the PricingDetail schema
const pricingDetailSchema = new mongoose.Schema(
  {
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    availability: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Create PricingDetail model
module.exports = mongoose.model("PricingDetail", pricingDetailSchema);
