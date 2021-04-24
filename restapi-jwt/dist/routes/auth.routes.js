"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controller_1 = require("../controllers/user.controller");
const photo_controller_1 = require("../controllers/photo.controller");
const multer_1 = __importDefault(require("../libs/multer"));
router.post('/signup', user_controller_1.signUp);
router.post('/signin', user_controller_1.signIn);
router
    .post('/photo', multer_1.default.single('image'), photo_controller_1.createPhotos)
    .get('/photo', photo_controller_1.getPhotos)
    .get('/photo/:id', photo_controller_1.getPhoto)
    .delete('/photo/:id', photo_controller_1.deletePhoto)
    .put('/photo/:id', photo_controller_1.updatePhoto);
exports.default = router;
