import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, "../env/"+process.env.NODE_ENV+'.env')
})

let variables_entorno:any ={
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || '3001'

};

export default variables_entorno;