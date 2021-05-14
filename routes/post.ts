import {Router, Response} from 'express';
import{verificacionToken} from '../middlewares/authentication'
import { Post } from '../models/post.models';
import { json } from 'body-parser';
import { IfileUpload } from '../interfaces/file-upload';

const postRouter = Router();

postRouter.post('/', verificacionToken, (req:any, res:Response)=>{
    
    const body = req.body;
    body.usuario = req.usuario.id;

    Post.create(body)
        .then(async postDb=>{

           await postDb.populate('usuario').execPopulate()


            res.json({
                estado: "success",
                data: postDb
            })
        })
})

postRouter.get('/', async (req:any, res:Response)=>{

    let ctd = Number(req.query.ctd_por_pagina)
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip*ctd
     
    // query("select * from personas where id_persona >=? limit 5",[skip])

    const post = await Post.find()
                            .sort({id:-1})   
                            .skip(skip)
                            .limit(ctd)
                            .populate('usuario', '-password')
                            .exec()

    res.json({
        estado:"success",
        data: post
    })

})

postRouter.post('/upload', verificacionToken, (req:any, res:Response)=>{
    
    let imagen:IfileUpload = req.files.imag

    if(!imagen){
        return res.status(400).json({
            estado:"error",
            mensaje: "No se envio imagen"
        })
    }

    const validartipoImagen = imagen.mimetype.includes('image');

    if(!validartipoImagen){
        return res.status(400).json({
            estado:"error",
            mensaje: "El file no es una imagen"
        })
    }

    res.json({
        estado: "success",
        imagen: imagen
    })
})

export default postRouter;