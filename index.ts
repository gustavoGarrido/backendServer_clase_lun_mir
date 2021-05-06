import Server from './class/server';
import userRoutes from './routes/usuarios';
import mysql from 'mysql';
import {conectionMysql} from './bin/mySqlConection';
import mongoConection from './bin/mongoConexion';
import bodyPaser from 'body-parser';


//Instanciando servidor web
const server = new Server();
server.start(()=>{
    console.log(`Servidor corriendo en puerto: ${server.port} y en host ${server.host}`);
});

//Body parser

server.app.use(bodyPaser.urlencoded({extended:true}));
server.app.use(bodyPaser.json());

//Rutas de la app

server.app.use('/users',    userRoutes);
server.app.use('/usersSql', userRoutes);

//Conexion mySQL

conectionMysql.connect((err)=>{
    console.log(`Base de datos corriendo en sistema mySQL`)
});

//Conexion mongo
mongoConection






