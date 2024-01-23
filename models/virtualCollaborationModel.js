const mongoose = require("mongoose");

// Define the VirtualCollaborationOption schema
const virtualCollaborationSchema = new mongoose.Schema(
  {
    influencerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },
    optionName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    availability: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Create VirtualCollaborationOption model
module.exports = mongoose.model(
  "VirtualCollaboration",
  virtualCollaborationSchema
);
