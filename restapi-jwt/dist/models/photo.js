"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const photoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('Photo', photoSchema);
