"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../middleware/multer");
router.post('/regist-account', userController_1.registAccount);
router.post('/login-account', userController_1.loginAccount);
router.patch('/update-account', auth_1.authorization, multer_1.upload, userController_1.updateAvatar);
router.delete('/delete-account', userController_1.deleteAccount);
exports.userRoute = router;
