// models/Sale.js

import { Schema, model, models } from 'mongoose';

const SaleSchema = new Schema({
  sellerEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      qty: Number,
      price: Number,
      total: Number,
      userEmail: String,
      productId: String,
    },
  ],
  subTotal: {
    type: Number,
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

const Sale = models.Sale || model('Sale', SaleSchema);

export default Sale;
