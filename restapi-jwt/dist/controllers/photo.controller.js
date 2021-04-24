"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const photo_1 = __importDefault(require("../models/photo"));
async function getPhotos(req, res) {
    const photos = await photo_1.default.find();
    return res.json({
        photos
    });
}
exports.getPhotos = getPhotos;
async function getPhoto(req, res) {
    const { id } = req.params;
    const photo = await photo_1.default.findById(id);
    return res.json({
        photo
    });
}
exports.getPhoto = getPhoto;
async function createPhotos(req, res) {
    const { title, description } = req.body;
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file.path
    };
    const photo = new photo_1.default(newPhoto);
    await photo.save();
    return res.json({
        message: 'Foto guardada',
        photo
    });
}
exports.createPhotos = createPhotos;
async function deletePhoto(req, res) {
    const { id } = req.params;
    const photo = await photo_1.default.findByIdAndRemove(id);
    if (photo) {
        await fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
    }
    return res.json({
        message: 'Foto removida',
        photo
    });
}
exports.deletePhoto = deletePhoto;
async function updatePhoto(req, res) {
    const { title, description } = req.body;
    const { id } = req.params;
    const updatePhoto = await photo_1.default.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });
    return res.json({
        message: "Iamgen actualizada",
        updatePhoto
    });
}
exports.updatePhoto = updatePhoto;
