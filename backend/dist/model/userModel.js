"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    username: {
        type: String,
        required: [true, 'Please fill username']
    },
    email: {
        type: String,
        required: [true, 'Please fill email'],
        match: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
    },
    avatar: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: [true, 'Please fill password']
    }
});
exports.userModel = mongoose_1.default.model('User', userSchema);
