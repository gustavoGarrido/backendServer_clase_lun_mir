import express from 'express';
import variables_entorno from '../config';

export default class Server {
    public app:express.Application;
    public port: number = variables_entorno.PORT;
    public host:string = variables_entorno.HOST;

    constructor(){
        this.app = express();
    }

    private revisarServidor(){
        console.log("revisar servidor");
    }

    public start(callback:any):void{
        this.app.listen(this.port, this.host, callback);
    }
}