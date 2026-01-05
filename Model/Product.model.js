import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  // you can add more fields later (like brand, stock, etc.)
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
