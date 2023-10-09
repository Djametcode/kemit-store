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
exports.getAllProduct = exports.updateProduct = exports.createProduct = void 0;
const productModel_1 = require("../model/productModel");
const cloudinary_1 = require("cloudinary");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, price, stock, description, color } = req.body;
    let file = req.file;
    try {
        if (!productName || !price || !stock || !description) {
            return res.status(201).json({ msg: 'Please provide product information' });
        }
        if (file) {
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
        return res.status(201).json({ msg: 'Please provide product image' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { productName, price, stock, description } = req.body;
    try {
        const productDetail = yield productModel_1.productModel.findOne({ _id: id });
        const checkOwner = (productDetail === null || productDetail === void 0 ? void 0 : productDetail.owner.toString()) === req.user.userId;
        if (!checkOwner) {
            return res.status(401).json({ msg: 'Please login with correct account' });
        }
        const product = yield productModel_1.productModel.findOneAndUpdate({ _id: id }, { productName: productName }, { new: true });
        return res.status(200).json({ msg: 'Success', product });
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
