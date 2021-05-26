import { Router, Response, Request, NextFunction } from 'express';
import { Irequest } from '../interfaces/requestExpress';

export = {
    payload: (req:any, res:Response, next:NextFunction)=>{
        let request:Irequest = req;
        const usuario = request.usuario;

        res.json({
            estado:"success",
            mensaje: usuario
        })

    }
}