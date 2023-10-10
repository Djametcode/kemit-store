import mongoose, { Document, Types } from "mongoose";
import { Schema } from "mongoose";

interface Rating {
    ratingId: Types.ObjectId
}

interface Variant {
    color: string;
}

interface Product extends Document {
    productName: string;
    price: number;
    stock: number;
    variant: Variant[];
    description: string;
    image: string[];
    rating: Rating[];
    owner: Types.ObjectId;
}

const productSchema = new Schema<Product>({
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
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        }
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const productModel = mongoose.model<Product>('Product', productSchema)