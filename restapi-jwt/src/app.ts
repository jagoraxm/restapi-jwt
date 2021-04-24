import express from "express";
import morgan from "morgan";
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';
import path from 'path';

import authRoutes from './routes/auth.routes';
import privateRoutes from './routes/private.routes';

//Inicializaciones
const app = express();

//settings
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json()); 
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.get('/', (req, res) => {
    res.send(`La API esta en http://localhost:${app.get('port')}`);
});

app.use('/uploads',express.static(path.resolve('uploads')));

app.use(authRoutes);
app.use(privateRoutes);

export default app;