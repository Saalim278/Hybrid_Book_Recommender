import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    isbn: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    totalPrice: Number,
    status: { type: String, default: "Pending" },
    image: { type: String },
    cancellationReason: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
