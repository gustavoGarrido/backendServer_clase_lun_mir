import {Router, Response} from 'express';
import{verificacionToken} from '../middlewares/authentication'
import { Post } from '../models/post.models';

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

    const post = await Post.find()
                            .sort({_id:-1})
                            .skip(skip)
                            .limit(ctd)
                            .populate('usuario', '-password')
                            .exec()

    res.json({
        estado:"success",
        data: post
    })

})

export default postRouter;