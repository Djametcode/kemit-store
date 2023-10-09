"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const productSchema = new mongoose_2.Schema({
    productName: {
        type: String,
        required: [true, 'Please provide product name']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price']
    },
    stock: {
        type: Number,
        required: [true, "Please provide product stock"]
    },
    variant: [{
            color: {
                type: String,
                required: [true, 'Please provide product color']
            }
        }],
    description: {
        type: String,
        required: [true, 'Please provide to make your product visible']
    },
    image: [],
    rating: [{
            ratingId: {
                type: mongoose_2.Schema.Types.ObjectId,
                ref: 'Rating'
            }
        }],
    owner: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.productModel = mongoose_1.default.model('Product', productSchema);
