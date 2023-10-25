"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.deleteItemInsideCart = exports.deleteCart = exports.getMyCart = exports.addProductToCart = exports.deleteProduct = exports.getAllProduct = exports.updateProduct = exports.createProduct = void 0;
const productModel_1 = require("../model/productModel");
const cloudinary_1 = require("cloudinary");
const cartModel_1 = require("../model/cartModel");
const userModel_1 = require("../model/userModel");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, price, stock, description, color } = req.body;
    let file = req.file;
    try {
        if (!productName || !price || !stock || !description) {
            return res.status(201).json({ msg: 'Please provide product information' });
        }
        if (!file) {
            return res.status(201).json({ msg: 'Please attach file' });
        }
        const result = yield cloudinary_1.v2.uploader.upload(file.path, {
            folder: 'Testing',
            resource_type: 'auto'
        });
        const newProduct = new productModel_1.productModel({
            productName: productName,
            price: price,
            stock: stock,
            description: description,
            variant: [{
                    color: color
                }],
            image: [result.secure_url],
            owner: req.user.userId
        });
        const product = yield productModel_1.productModel.create(newProduct);
        return res.status(200).json({ msg: 'Success', product });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productModel_1.productModel.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ msg: 'Backend Error' });
        }
        return res.status(200).json({ msg: 'Success', product });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { productName, price, stock, description } = req.body;
    try {
        if (!productName || !price || !stock || !description) {
            return res.status(201).json({ msg: 'Please fill all requipment' });
        }
        const product = yield productModel_1.productModel.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        const checkOwner = (product === null || product === void 0 ? void 0 : product.owner.toString()) === req.user.userId;
        if (!checkOwner) {
            return res.status(401).json({ msg: 'Please login with correct account' });
        }
        const updatedProduct = yield productModel_1.productModel.findOneAndUpdate({ _id: id }, Object.assign({}, req.body), { new: true });
        return res.status(200).json({ msg: 'Success', updatedProduct });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProduct = updateProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.productModel.find({});
        return res.status(200).json({ msg: 'Success', product });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllProduct = getAllProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const selectedProduct = yield productModel_1.productModel.findOne({ _id: id });
        const checkOwner = (selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.owner.toString()) === req.user.userId;
        if (!checkOwner) {
            return res.status(401).json({ msg: 'Only owner can delete this' });
        }
        const product = yield productModel_1.productModel.findOneAndDelete({ _id: id });
        return res.status(200).json({ msg: 'Success', product });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProduct = deleteProduct;
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, cartId } = req.query;
    const { quantity } = req.body;
    const cart = new cartModel_1.cartModel({
        product: [{
                productId: productId,
                quantity: quantity
            }],
        createdBy: req.user.userId
    });
    try {
        const user = yield userModel_1.userModel.findOne({ _id: req.user.userId });
        const newCart = yield cartModel_1.cartModel.create(cart);
        user === null || user === void 0 ? void 0 : user.cart.push({
            cartId: newCart._id
        });
        const savedUser = yield (user === null || user === void 0 ? void 0 : user.save());
        return res.status(200).json({ msg: 'item added to cart', savedUser, newCart });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addProductToCart = addProductToCart;
const getMyCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myCart = yield cartModel_1.cartModel.find({ createdBy: req.user.userId }).populate({ path: "product.productId" });
        return res.status(200).json({ msg: 'Success', myCart });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getMyCart = getMyCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: req.user.userId });
        const index = user === null || user === void 0 ? void 0 : user.cart.findIndex((item) => item.cartId.equals(id));
        if (index === -1) {
            return res.status(404).json({ msg: 'Cart item not found' });
        }
        user.cart.splice(index, 1);
        yield user.save();
        return res.status(200).json({ msg: 'Cart item deleted successfully' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteCart = deleteCart;
const deleteItemInsideCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, cartId } = req.query;
    try {
        const cart = yield cartModel_1.cartModel.findOne({ _id: cartId });
        const indexProduct = cart.product.findIndex((item) => item.productId.toString() === productId);
        console.log(indexProduct);
        return res.status(200).json({ msg: 'Success', cart });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteItemInsideCart = deleteItemInsideCart;
