import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // e.g., "Men's T-Shirt"
    trim: true
  },
  category: {
    type: String,
    // enum: ["Men", "Women", "Kids", "Unisex","Machine"],
    enum: ["Machine", "Hand Tilla", "Aari Work", "Others"],

    required: true
  },
  type: {
    type: String,
    required: true, // e.g., "Shirt", "Jeans", "Jacket"
  },
  size: {
    type: [String], // e.g., ["S", "M", "L", "XL"]
    default: []
  },
  color: {
    type: [String], // e.g., ["Red", "Black", "Blue"]
    default: []
  },
  material: {
    type: String, // e.g., "Cotton", "Polyester"
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  brand: {
    type: String
  },
  description: {
    type: String
  },
  images: {
    type: [String], // URLs of images
    default: []
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Clothes = mongoose.model("Clothes", clothesSchema);

export default Clothes;
