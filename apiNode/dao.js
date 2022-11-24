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

    async run(sql,data=[]){//update
        const client = await this.db.connect();
        let res = false;
        try {
            await client.query(sql,data)
            res= true
        }catch (e) {
            console.log(e)
        }
        client.release();
        console.log(res)
        return res;
    }

    async get(sql, params = []) { //select
        const client = await this.db.connect();
        let res=null;
        try {
            res = await client.query(sql, params)
            res=  res.rows[0]
        }catch (e) {
            console.log("erreur execution", sql)
            console.log(e);
        }
        client.release();
        return res;
    }

    async all(sql, params = []) { //select
        const client = await this.db.connect();
        let res=null;
        try {
            res = await client.query(sql, params)
            res=res.rows
            console.log(res)
        }catch (e) {
            console.log(e);
        }
        client.release();
        return res;
    }

    async insert(sql,params=[]){//insert
        const client = await this.db.connect();
        let res = null;
        try {
            res = await client.query(sql+" returning *",params)
            res=  res.rows[0]
            console.log("INSERTED : "+res)
        }catch (e) {
            console.log(e)
        }
        client.release();
        return res;
    }

}

export default AppDAO;