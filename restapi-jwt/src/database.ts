import mongoose, { ConnectionOptions } from "mongoose";
import config from './config/config';

const dbOptions:ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
};

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Conexión a Mongo establecida con éxito');
});

connection.on('error', err => {
    console.log(err);
    process.exit(0);
}); 