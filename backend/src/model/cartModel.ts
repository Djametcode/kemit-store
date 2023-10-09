import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

interface CartProduct {
    productId: Types.ObjectId;
    quantity: number
}

interface Cart {
    createdBy: Types.ObjectId,
    product: CartProduct[]
}

const cartSchema = new Schema<Cart>({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

export const cartModel = mongoose.model('Cart', cartSchema)