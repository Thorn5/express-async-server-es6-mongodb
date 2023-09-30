// Order_MongoDB_Schema.mjs
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [{
      product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
  }]
},
  { timestamps: true });
  

const Order = mongoose.model("Order", OrderSchema);
export default Order; 