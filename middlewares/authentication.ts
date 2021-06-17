import Token from '../class/token';
import { NextFunction, Response } from 'express';
import query from '../utils/queryPromise'


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

// export const ValidarRolAdmin = async (req:any, res:Response, next:NextFunction)=>{

//     const id_usuario = req.usuario.id

//    const rol =  await query("select rol from roles where id_usuario = ?",[id_usuario])

//    if(rol.[0]["rol"] === "administrador"){
//        next()
//    }
//    else{
//        res.json({
//            estado:"succes",
//            mensaje: "el usuario no es administrador"
//        })
//    }

// }