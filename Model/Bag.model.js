import mongoose from "mongoose";

const bagItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clothes",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("BagItem", bagItemSchema);
