import mongoose from "mongoose";

const paymentSchema = new  mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    provider: {
      type: String,
      enum: ["RAZORPAY", "STRIPE", "PAYTM", "CASH"],
      required: true,
    },

    orderId: {
      type: String, // from payment provider
      required: true,
    },

    paymentId: {
      type: String, // provider transaction id
    },

    receipt: {
      type: String,
    },

    description: {
      type: String,
    },

    metadata: {
      type: Object,
      default: {},
    }
  },
  { timestamps: true })

const paymentModel = mongoose.model("payment", paymentSchema)
export default paymentModel;

