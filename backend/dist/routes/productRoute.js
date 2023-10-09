"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const productController_1 = require("../controller/productController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
route.get('/get-all-product', productController_1.getAllProduct);
route.post('/create-product', auth_1.authorization, multer_1.upload, productController_1.createProduct);
route.patch('/update-product/:id', auth_1.authorization, productController_1.updateProduct);
exports.productRoute = route;
