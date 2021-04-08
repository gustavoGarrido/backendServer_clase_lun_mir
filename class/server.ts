import express from 'express';

export default class Server {
    public app:express.Application;
    public port: number = 3002;
    public host:string = 'localhost';

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