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
        return this.dao.run(sql,"User table ok")
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
            let cols=emp
            let query = "insert into users(nom,prenom,pseudo,password, email, isNotif, idRole) " +
                "values($1,$2,$3,$4,$5,$6,$7)";
            await this.dao.save(query,cols);
        }
    }

    async getAll(){
        const sql="select * from users"
        console.log("ok2")
        return await dao.all(sql);
    }

    async getUserById(id){
        const sql="select * from user where idUser=$1"
        return await dao.get(sql,[id]);
    }

}

export default user