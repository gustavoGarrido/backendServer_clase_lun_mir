import {Router, Request, Response } from 'express';
import {conectionMysql} from '../bin/mySqlConection';
import query from '../utils/queryPromise'

const userSqlRoutes = Router();


userSqlRoutes.post('/create', async (req:any, res:Response)=>{

    try{
        const body = req.body;
        const nombre = body.nombre;
        const apellido = body.apellido;
        const tipo_documento = body.tipo_documento;
        const numero_documento = body.numero_documento;
        const nombre_usuario = body.nombre_usuario;
        const password = body.password;
    
        const start_transaction = await query("start transaction");
    
        const insertPersona:any = await query("INSERT INTO PERSONAS(NOMBRE, APELLIDO, TIPO_DOCUMENTO, NUMERO_DOCUMENTO) VALUES(?,?,?,?)",[nombre, apellido,tipo_documento,numero_documento]);
    
        const insertUsuarios = await query("INSERT INTO USUARIOS(ID_USUARIO, NOMBRE_USUARIO, md5(PASSWORD)) VALUES (?,?,?)",[insertPersona.insertId, nombre_usuario, password]);
    
        const commit = await query("commit");

        res.json({
            estado:"success",
            mensaje: commit
        })
    }
    catch(error){
        const rollback = await query("rollback");
        res.json({
            estado:"error",
            mensaje: error
        })
    }


    // query("INSERT INTO PERSONAS(NOMBRE, APELLIDO, TIPO_DOCUMENTO, NUMERO_DOCUMENTO) VALUES(?,?,?,?)",[nombre, apellido,tipo_documento,numero_documento])
    //     .then(resultPersonas =>
    //         query("INSERT INTO USUARIOS(ID_USUARIO, NOMBRE_USUARIO, PASSWORD) VALUES (?,?,?)",[resultPersonas, nombre_usuario, password])
    //     )
    //     .catch(error=>{
    //         res.json({
    //             estado:"error",
    //             data:error
    //         })
    //     })

    


    // conectionMysql.query("INSERT INTO PERSONAS(NOMBRE, APELLIDO, TIPO_DOCUMENTO, NUMERO_DOCUMENTO) VALUES(?,?,?,?)",[nombre, apellido,tipo_documento,numero_documento],(error, result)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //     else{
    //         conectionMysql.query("INSERT INTO USUARIOS(ID_USUARIO, NOMBRE_USUARIO, PASSWORD) VALUES (?,?,?)",[result.insertId, nombre_usuario, password],(error, resultUsuario)=>{
    //             if(error){
    //                 res.json({
    //                     estado: "error",
    //                     mensaje: error
    //                 })
    //             }
    //             else{
    //                 res.json({
    //                     estado: "success",
    //                     mensaje: "usuario creado con exito",
    //                     data: resultUsuario
    //                 })
    //             }
    //         })
    //     }
    // })


})

export default userSqlRoutes;