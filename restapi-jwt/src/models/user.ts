import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document{
    email: string,
    password: string,
    nombre: string,
    apellidoP: string,
    apellidoM: string, 
    fecNacimiento: Date,
    codigoPostal: string,
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true 
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
        uppercase: true,
    },
    apellidoP: {
        type: String,
        required: true,
        uppercase: true,
    },
    apellidoM: {
        type: String,
        uppercase: true,
    },
    fecNacimiento: {
        type: Date
    },
    codigoPostal: {
        type: String,
        required: true
    }
})

userSchema.pre<IUser>('save', async function(next) {
    const user = this; 

    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();

});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);