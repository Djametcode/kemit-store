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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateAvatar = exports.loginAccount = exports.registAccount = void 0;
const userModel_1 = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("cloudinary");
const registAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(401).json({ msg: 'Please fill all requipment' });
        }
        const isExist = yield userModel_1.userModel.findOne({ username: username, email: email });
        console.log(isExist);
        if (isExist) {
            return res.status(201).json({ msg: 'Email or username already exist' });
        }
        const salt = yield bcrypt_1.default.genSalt(12);
        const hashedPass = yield bcrypt_1.default.hash(password, salt);
        const newUser = new userModel_1.userModel({
            username: username,
            email: email,
            password: hashedPass
        });
        const user = yield userModel_1.userModel.create(newUser);
        return res.status(200).json({ msg: 'Success regist', user });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: 'Internal server error' });
    }
});
exports.registAccount = registAccount;
const loginAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ msg: 'Please fill all requipment' });
        }
        const isExist = yield userModel_1.userModel.findOne({ email: email });
        if (!isExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isPassCorrect = yield bcrypt_1.default.compare(password, isExist.password);
        console.log(isPassCorrect);
        if (!isPassCorrect) {
            return res.status(401).json({ msg: 'Passoword wrong' });
        }
        const token = yield jsonwebtoken_1.default.sign({ userId: isExist._id, username: isExist.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
        return res.status(200).json({ msg: 'Success', isExist, token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginAccount = loginAccount;
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        if (!file) {
            return res.status(401).json({ msg: 'Please attach file' });
        }
        const result = yield cloudinary_1.v2.uploader.upload(file, {
            folder: 'Testing',
            resource_type: 'auto'
        });
        const user = yield userModel_1.userModel.findOneAndUpdate({ _id: req.user.userId }, { avatar: result.secure_url }, { new: true });
        return res.status(200).json({ msg: "Success", user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateAvatar = updateAvatar;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.userModel.findOneAndDelete({ _id: req.user.userId });
        return res.status(200).json({ msg: "Success", user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAccount = deleteAccount;
