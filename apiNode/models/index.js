import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
})
const db = {sequelize, Sequelize};

try {
    await sequelize.authenticate()
}catch (e) {
    console.error(e)
    exit(1)
}

import {User} from "./users.js"
db.user = User(Sequelize,sequelize)
import {Role} from "./roles.js"
db.role = Role(Sequelize,sequelize)


db.user.belongsTo(db.role, {foreignKey: 'idRole'})
db.role.hasMany(db.user, {foreignKey: 'idRole'})

let option={}
// option.force=true
await sequelize.sync(option)//{force:true}

if(option.force===true) {
    db.role.create({idRole: 1, libelle: "admin"})
    db.role.create({idRole: 2, libelle: "user"})
}
export default db;
