
import path from 'path';
import fs from 'fs';
import unidid from 'uniqid';
import { IfileUpload } from '../interfaces/file-upload';

export default class FileSystem {

    constructor(){};

    private crearCarpetaUsuario(userId:string):string{
        const pathUser = path.resolve(__dirname, '../uploads', userId); 
        const pathUserTemp = pathUser+'/temp' //path.resolve(pathUser, 'temp');

        const existe:boolean = fs.existsSync(pathUser); 

        if(!existe){
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }

    private generarNombreUnico(nombreOriginal:string):string{
        
        const nombreArr:Array<string> = nombreOriginal.split('.'); // [imagen_prueba, jpg]
        const extension:string = nombreArr[nombreArr.length-1];
        const idUnico:string = unidid();

        return `${idUnico}.${extension}`;
    }

    guardarImagenTemporal(userId:string, file:IfileUpload):Promise<any>{

        return new Promise((resolve, reject)=>{
            const path:string = this.crearCarpetaUsuario(userId) //La ruta en la cual va a guardarse la imagen
            const nombreArchivo:string = this.generarNombreUnico(file.name) //EL nombre de la imagen guardada en el path
    
            file.mv(`${path}/${nombreArchivo}`, (error:any)=>{
                if(error){
                    return reject(error)
                }
                else{
                    return resolve("ok")
                }
            })
        })

    };

    private obtenerImagenesEnTemp(userId:string):Array<string>{
        const pathTemp = path.resolve(__dirname, '../uploads', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];
    }

    imagenDeTempHaciaPost(userId:string){
        const pathUserTemp = path.resolve(__dirname, '../uploads', userId, 'temp') //desde
        const pathUserPost = path.resolve(__dirname, '../uploads', userId, 'post') //hacia donde 

        if(!fs.existsSync(pathUserTemp)){
            return [];
        }

        if(!fs.existsSync(pathUserPost)){
            fs.mkdirSync(pathUserPost)
        }

        const imagenesTemp:Array<string> = this.obtenerImagenesEnTemp(userId);

        imagenesTemp.forEach(imagen=>{
            fs.renameSync(`${pathUserTemp}/${imagen}`, `${pathUserPost}/${imagen}`)
        });

        return imagenesTemp;
    };

    getFotoUrl(userId:string, img:string){

        const pathFoto = path.resolve(__dirname, '../uploads', userId, 'post' , img);

        if(fs.existsSync(pathFoto)){
            return pathFoto
        }
        else{
            return path.resolve(__dirname, '../assets', 'imagen_default.jpg');
        }

    }

    validarPathUpload(){
        const pathUpload = path.resolve(__dirname, '../uploads');
        if(!fs.existsSync(pathUpload)){
            fs.mkdirSync(pathUpload);
        }
    }
}