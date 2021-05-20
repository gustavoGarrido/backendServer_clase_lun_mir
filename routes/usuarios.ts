import {Router, Request, Response} from 'express';
import { Usuario } from '../models/usuarios.model';
import bcrypt from 'bcrypt';
import Token from '../class/token';
import { verificacionToken } from '../middlewares/authentication';
import Email from '../class/email'
import { Irequest } from '../interfaces/requestExpress';


const emailClass = new Email();

const userRoutes = Router();

// userRoutes.get('/prueba',(req:Request, res:Response)=>{
//     res.json({
//         estado:'success',
//         mensaje: 'ok'
//     });
// });

userRoutes.post('/create', async (req:Request, res:Response)=>{
    
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


    // Usuario.create(user).then(async result=>{

    //     const emailEnviado = await emailClass.enviarEmail(user.email, "Creacion cuenta", "Cuenta creada con exito", "")
    //     res.json({
    //         estado: "success",
    //         mensaje: result,
    //         email: emailEnviado
    //     })
    // })
    // .catch(error=>{
    //     res.json({
    //         estado: "error",
    //         mensaje: error
    //     })
    // });
});

userRoutes.post('/login', (req:Request, res:Response)=>{
    
    const body = req.body;

    Usuario.findOne({email: body.email},null,null,(error, result)=>{
        if(error){
            throw error
        }
        if(!result){
            res.json({
                estado:"success",
                mensaje: "Usuario no encontrado en la base de datos",
            })
        }
        if(result?.compararPassword(body.password)){

            const userToken = Token.getJwtToken({
                id:result._id,
                nombre: result.nombre,
                avatar: result.avatar
            });


            res.json({
                estado: "success",
                token: userToken,
                mensaje: "usuario encontrado",
                data: result
            })
        }
    })
})

userRoutes.get('/', verificacionToken, async (req:any, res:Response)=>{

    // const request:Irequest = req;

    // const usuario = request.usuario.id


    
    console.log(req.usuario);

    const emailEnvio = await emailClass.enviarEmail("ingindustrial.gustavo@gmail.com", "prueba envio", "",
     "<h2> Titulo con html </h2>");

    res.json({
        estado:"success",
        mensaje: emailEnvio
    })



})

export default userRoutes;