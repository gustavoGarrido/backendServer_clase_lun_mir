import { Router, Response, Request, NextFunction } from 'express';
import { Irequest } from '../interfaces/requestExpress';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/usuarios.model';
import Email from '../class/email'

export = {
    payload: (req:any, res:Response, next:NextFunction)=>{
        let request:Irequest = req;
        const usuario = request.usuario;

        res.json({
            estado:"success",
            mensaje: usuario
        })

    },
    create: async (req:any, res:Response)=>{

        const emailClass = new Email()

        const user = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10)
        };

        try{
            const crearUsuario = await Usuario.create(user); //ok
            const enviarEmail = await emailClass.enviarEmail(user.email, "Creacion cuenta", "Cuenta creada con exito", "");
        
            res.json(
                {
                estado: "success",
                mensaje: crearUsuario,
                email: enviarEmail
            })
        
        }
        catch(error){
            const enviarEmail = await emailClass.enviarEmail(user.email, "Error creacion cuenta", "Ha habido un error al crear la cuenta vuelva a intentar mas tarde", "");
        }
    }
}
