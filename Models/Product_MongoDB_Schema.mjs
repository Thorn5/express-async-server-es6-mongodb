// Product_MongoDB_Schema.mjs
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: {
    full_size: { type: String, required: true },
    thumbnail: { type: String, required: true }
  },
  price: { type: Number, required: true },
  quantity_available: { type: Number, required: true }
}, { timestamps: true });


const Product = mongoose.model("Product", ProductSchema);
export default Product;