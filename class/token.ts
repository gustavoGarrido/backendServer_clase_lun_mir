import jwt from 'jsonwebtoken';


export default class Token {

    static seed:string = "este-es-el-seed";
    static caducidad:string = "30d";

    constructor(){

    }

    static getJwtToken(paylod:any):string{
        return jwt.sign({
            usuario: paylod
        }, this.seed, {expiresIn: this.caducidad})
    }

    static comprobarToken(token:string):Promise<any>{
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.seed, (error,decode)=>{
                if(error){
                    return reject()
                }
                else{
                    return resolve(decode)
                }
            
            })
            
        })
    }
}