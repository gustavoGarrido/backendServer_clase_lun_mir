import mongoose from 'mongoose';

const mongoConection = mongoose.connect('/mongodb://localhost:27017/appCurso_lun_mie',
                {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true},
                (error)=>{
                    if(error){
                        throw error
                    }
                    else{
                        console.log("conectado a base de datos mongo")
                    }
                }

)

export default mongoConection;