import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IPhoto extends Document{
    title: string,
    description: string,
    imagePath: string
}

const photoSchema = new Schema({
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
})

export default model<IPhoto>('Photo', photoSchema);