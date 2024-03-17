const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    product:
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      color: {
        type: String,
      },
      size: {
        type: String,
      },
      title: {
        type: String,
      },
      img: {
        type: String,
      },
      price: {
        type: Number,
      }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
