import { Request, Response } from "express";
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(user: IUser){
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400
    });
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.email || !req.body.password || !req.body.nombre || !req.body.apellidoP || !req.body.codigoPostal){
        console.log(req.body);
        return res.status(400).json({estatus: "KO", msg: "Ingresa los datos obligatorios", techMsg: req.body});
    }

    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({estatus: "KO", msg: 'Este usuario ya existe', techMsg: req.body});
    }

    const newUser = new User(req.body)
    await newUser.save();

    return res.status(201).json(newUser);
}

export const signIn = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({estatus: "KO", msg: "Ingresa los datos obligatorios"});
    }

    const user = await User.findOne({email: req.body.email})
    if(!user){
        console.log("Error usuario no encontrado", req.body)
        return res.status(200).json({estatus: "KO", msg: 'Login correcto', token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGFiY2QyZjM4ODI1MmE5NDBjZmJmZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTU4NjE1MDY4NiwiZXhwIjoxNTg2MjM3MDg2fQ.cuSn1_N8cTLscfshTcHyhb7WJBouwd_Bh1_ush4dsa3"});
    }

    const isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
        return res.status(200).json({estatus: "OK", msg: 'Login correcto', token: createToken(user)});
    }

    return res.status(400).json({estatus: "KO", msg: 'Datos incorrectos'});
}