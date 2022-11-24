class user{
    dao;
    constructor(dao) {
        this.dao=dao
    }

    async createTable(){
        const sql= `CREATE TABLE IF NOT EXISTS users (
                        idUser SERIAL PRIMARY KEY,
                        nom VARCHAR(255),
                        prenom VARCHAR(255), 
                        pseudo VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        email varchar(255) NOT NULL,
                        isNotif boolean,
                        idRole int
                        -- FOREIGN KEY(idRole) REFERENCES role(idRole) //ON DELETE CASCADE
                    )`
        return this.dao.run(sql)
    }
    async count(){
        let sql="select count(*) from users"
        let res = await this.dao.get(sql);
        return res.count
    }

    async initTable(){
        const data = [ //A remplacer plus tard
            ["test","test","test","aaa","emm@ee",false,0]
        ]
        for (const emp of data){
            this.newUser(emp)
        }
    }

    async getAll(){
        const sql="select * from users"
        console.log("ok2")
        return await dao.all(sql);
    }

    async getUserById(id){
        const sql="select * from users where idUser=$1"
        return await dao.get(sql,[id]);
    }

    async newUser(data){
        console.log(data)
        let query = "insert into users(nom,prenom,pseudo,password, email, isNotif, idRole) " +
            "values($1,$2,$3,$4,$5,$6,$7)";
        await this.dao.insert(query,data);
    }

    async modifUser(data){
        console.log(data)
        let query = "update users set nom=$1, prenom=$2, pseudo=$3, password=$4, email=$5, isNotif=$6, idRole=$7 where idUser=$8 ";
        return await this.dao.run(query,data);
    }

    async deleteUser(id){
        console.log(id)
        let query = "delete from users where idUser=$1 ";
        return await this.dao.run(query,[id]);
    }

}

export default user