import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
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
    quantity: {
        type: Number,
        default: 1,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    category: {
        type: String,
    },
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    sellerEmail: {
        type: String,
        required: true,
    },
    sellerPhone: {
        type: String,
        required: true,
    }
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
