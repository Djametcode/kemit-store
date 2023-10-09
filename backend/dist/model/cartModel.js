"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const cartSchema = new mongoose_2.Schema({
    createdBy: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: [{
            productId: {
                type: mongoose_2.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
});
exports.cartModel = mongoose_1.default.model('Cart', cartSchema);
