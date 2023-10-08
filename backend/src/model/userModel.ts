import mongoose, { Document, Types } from "mongoose";
import { Schema } from "mongoose";

interface Cart {
    cartId: Types.ObjectId
}

interface User extends Document {
    username: string;
    email: string;
    password: string;
    cart: Cart[]
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, 'Please fill username']
    },
    email: {
        type: String,
        required: [true, 'Please fill email'],
        match: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
    },
    password: {
        type: String,
        required: [true, 'Please fill password']
    }
})

export const userModel = mongoose.model<User>('User', userSchema)