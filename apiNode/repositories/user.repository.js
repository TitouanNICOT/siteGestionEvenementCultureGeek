class user{
    dao;
    constructor(dao) {
        this.dao=dao
    }

    async createTable(){
        const sql= `CREATE TABLE IF NOT EXISTS user(
                        idUser SERIAL PRIMARY KEY,
                        nom VARCHAR(255),
                        prenom VARCHAR(255), 
                        pseudo VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        email varchar(255) NOT NULL,
                        isNotif logical,
                        idRole int,
                        //FOREIGN KEY(idRole) REFERENCES role(idRole) //ON DELETE CASCADE
                    )`
        return this.dao.run(sql,"User table ok")
    }
    async count(){
        let sql="select count(*) from user"
        let res = await this.dao.get(sql);
        return res.count
    }

    async initTable(){
        const data = [ //A remplacer plus tard
            [1,"hugo","foulon",null,"ceo"],
            [2,"david","monnier",1,"font end manager"],
            [3,"valentin","mougenot",1,"back end manager"],
            [4,"ayoub","taguia",2,"font end dev"],
            [5,"nathan","valenne",2,"font end dev"],
            [6,"arnaud","chevalme",3,"back end dev"],
            [7,"lucas","dubol",3,"back end dev"]
        ]
        for (const emp of data){
            let cols=emp
            let query = "insert into user(idUser,nom,prenom,pseudo,password, email, isNotif, idRole) " +
                "values($1,$2,$3,$4,$5,$6,$7,$8)";
            await this.dao.save(query,cols);
        }
    }

    async getAll(){
        const sql="select * from user"
        return await dao.all(sql);
    }

    async getUserById(id){
        const sql="select * from user where idUser=$1"
        return await dao.get(sql,[id]);
    }

}

export default user