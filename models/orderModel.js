import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    verifiCodeAdmin: {
      type: String,
      default: "Not verified by admin",
    },
    verifiCodeUser: {
      type: String,
      default: "Not verified by User",
    },
    phone: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      default: "Not Verified",
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
