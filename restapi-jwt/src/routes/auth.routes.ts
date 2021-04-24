import { Router } from "express";
const router = Router();

import { signUp, signIn } from "../controllers/user.controller";
import { createPhotos, getPhotos, getPhoto, deletePhoto, updatePhoto } from "../controllers/photo.controller";

import multer from '../libs/multer';

router.post('/signup', signUp);
router.post('/signin', signIn);
router
    .post('/photo', multer.single('image'), createPhotos)
    .get('/photo', getPhotos)
    .get('/photo/:id', getPhoto)
    .delete('/photo/:id', deletePhoto)
    .put('/photo/:id', updatePhoto)

export default router;