import nodemailer from 'nodemailer';
import path from 'path';

export default class Email {

    host:string = "smtp.gmail.com"
    port:number = 587
    secure:boolean = false
    tsl:boolean = false
    auth = {
        user: "pruebascorreoggg123456789@gmail.com",
        pass: "zpadjcrftnmkopqm"
    }

    constructor(){}

    enviarEmail(cuenta_destino:string, asunto:string, cuerpo_email:string, html:string){

        return new Promise((resolve, reject)=>{
            const transport = nodemailer.createTransport({
                host: this.host,
                port: this.port,
                secure: this.secure,
                auth:{
                    user: this.auth.user,
                    pass: this.auth.pass
                }, 
                tls:{
                    rejectUnauthorized: this.tsl
                }
            });
    
            const mailOptions = {
                from: this.auth.user,
                to: cuenta_destino,
                subject: asunto,
                text: cuerpo_email,
                html: html,
                // attachments:[
                //     {
                //         path: path.resolve(__dirname, '../assets', 'imagen_default.jpg' )

                //     }
                // ]
            };
    
            nodemailer.createTestAccount((error)=>{
                transport.sendMail(mailOptions, (error, info)=>{
                    if(error){
                        return reject(error)
                    }
                    else{
                        return resolve(info)
                    }
                })
            })
        })

    }
}