const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    status: { type: String },
    userId: { type: String, required: true }, // Add userId field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
