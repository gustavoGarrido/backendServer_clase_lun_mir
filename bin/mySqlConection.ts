import mysql from 'mysql';

const conectionMysql = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database: 'reclamos_v3',
    port:3306
})

// conectionMysql.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     else{
//         console.log(`Base de datos mysql corriendo`);
//     }
// });

export {conectionMysql}; 