const mongoose = require("mongoose");

// Define the Payment schema
const paymentSchema = new mongoose.Schema(
  {
    collaborationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collaboration",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Create Payment model
module.exports = mongoose.model("Payment", paymentSchema);
