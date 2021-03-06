import Server from './class/server';
import userRoutes from './routes/usuarios';
import mysql from 'mysql';
import {conectionMysql} from './bin/mySqlConection';
import mongoConection from './bin/mongoConexion';
import bodyPaser from 'body-parser';
import postRouter from './routes/post';
import fileUpload from 'express-fileupload';
import FileSystem from './class/file-system';
import express from 'express';
import cors from 'cors'



//Instanciando servidor web
const server = new Server();
server.start(()=>{
    console.log(`Servidor corriendo en puerto: ${server.port} y en host ${server.host}`);
});

// body parser
server.app.use(express.urlencoded({ extended: false })); // express.urlencoded({ extended: false })
server.app.use(express.json()); //express.json()

//Cors
server.app.use(cors());

//validarUpload

const filesystem = new FileSystem();
filesystem.validarPathUpload();

//fileupload
server.app.use(fileUpload());

//Rutas de la app
server.app.use('/users',    userRoutes);
server.app.use('/usersSql', userRoutes);
server.app.use('/post', postRouter);

//Conexion mySQL

conectionMysql.connect((err)=>{
    console.log(`Base de datos corriendo en sistema mySQL`)
});

//Conexion mongo
mongoConection






