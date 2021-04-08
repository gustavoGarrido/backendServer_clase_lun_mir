import Server from './class/server';
import userRoutes from './routes/usuarios';
import mysql from 'mysql';
import {conectionMysql} from './bin/mySqlConection';

//Instanciando servidor web
const server = new Server();
server.start(()=>{
    console.log(`Servidor corriendo en puerto: ${server.port} y en host ${server.host}`);
});

//Rutas de la app

server.app.use('/users', userRoutes);

//Conexion mySQL

conectionMysql.connect((err)=>{
    console.log(`Base de datos corriendo en sistema`)
})






