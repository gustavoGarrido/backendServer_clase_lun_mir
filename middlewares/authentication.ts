import Token from '../class/token';
import { NextFunction, Response } from 'express';


export const verificacionToken = (req:any, res:Response, next:NextFunction)=>{
    
    const userToken = req.get('x-token') || "";

    Token.comprobarToken(userToken)
        .then(decoded=>{
            req.usuario = decoded.usuario
            console.log("decoded", decoded)
            next()
        })
        .catch(error=>{
            res.json({
                mensaje: "Token incorrecto"
            })  
        });
}