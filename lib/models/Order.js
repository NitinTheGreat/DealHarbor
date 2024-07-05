import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  items: [
    {
      name: String,
      qty: Number, // Changed to match the frontend data structure
      price: Number,
      total: Number,
      sellerEmail: String,
      sellerPhone: String,
      productId: String
    }
  ],
  subTotal: {
    type: Number,
    required: true
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  }
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
