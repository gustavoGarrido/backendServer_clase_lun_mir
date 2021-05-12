import {conectionMysql} from '../bin/mySqlConection';


 const query = (query:string, values:Array<any> = [])=>{
    return new Promise((resolve,reject)=>{
        conectionMysql.query(query, values, (error, result:{})=>{
            if(error){
                return reject(error)
            }
            else{
                return resolve(result)
            }
        })
    })
}

export default query
