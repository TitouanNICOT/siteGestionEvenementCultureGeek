//const {Pool} =require("pg")
import pkg from 'pg';
const {Pool} = pkg;
//const Promise =require("bluebird")
import Promise from "bluebird";
import dotenv from "dotenv";
dotenv.config();


class AppDAO{
    constructor() {
        const credentials = {
            user:process.env.DB_USERNAME,
            host:process.env.DB_HOST,
            database:process.env.DB_DATABASE,
            password:process.env.DB_PASSWORD,
            port:process.env.DB_PORT
        }

        this.db = new Pool(credentials);
        this.testConn();
    }

    async testConn(){
        const client = await this.db.connect();
        try {
            const res = await client.query("SELECT current_database()")
            console.log(res.rows[0])
        }catch (e) {
            console.log("ERR : impossible to connect in the database",e)
        }finally {
            client.release();
        }
    }

    async run(sql,success_message="OK"){//update
        const client = await this.db.connect();
        try {
            await client.query(sql)
            console.log(success_message)
        }catch (e) {
            console.log(e)
        }finally {
            client.release();
        }
    }

    get(sql,params=[]){ //select
        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,(err,result)=>{
                if (err){
                    console.log("erreur execution",sql)
                    console.log(err)
                    reject(err)
                }else{
                    resolve(result.rows[0])
                }
            })
        })
    }

    all(sql,params=[]){ //select
        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,(err,result)=>{
                if (err){
                    console.log("erreur execution",sql)
                    console.log(err)
                    reject(err)
                }else{
                    resolve(result.rows)
                }
            })
        })
    }

    async save(sql,params=[]){//insert
        const client = await this.db.connect();
        try {
            const res = await client.query(sql+" returning *",params)
            console.log("INSERTED : ")
            console.log(res.rows[0])
        }catch (e) {
            console.log(e)
        }finally {
            client.release();
        }
    }

}

export default AppDAO;