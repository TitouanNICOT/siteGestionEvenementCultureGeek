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
import {Stand} from "./stand.js"
db.stand = Stand(Sequelize,sequelize)
import {Type_stand} from "./type_stand.js"
db.type_stand = Type_stand(Sequelize,sequelize)
import {Evenement} from "./evenements.js"
db.evenement = Evenement(Sequelize,sequelize)
import {Type_evenement} from "./type_evenement.js"
db.type_evenement = Type_evenement(Sequelize,sequelize)

db.user.belongsTo(db.role, {foreignKey: 'idRole'})
db.role.hasMany(db.user, {foreignKey: 'idRole'})

db.stand.belongsTo(db.type_stand, {foreignKey: 'idTypeStand'})
db.type_stand.hasMany(db.stand, {foreignKey: 'idTypeStand'})

db.stand.belongsTo(db.user, {foreignKey: 'idPrestataire'})
db.user.hasMany(db.stand, {foreignKey: 'idPrestataire'})

db.evenement.belongsTo(db.type_evenement, {foreignKey: 'idTypeEvenement'})
db.type_evenement.hasMany(db.evenement, {foreignKey: 'idTypeEvenement'})

db.evenement.belongsTo(db.evenement, {foreignKey: 'idEvenement'})
db.evenement.hasMany(db.evenement, {foreignKey: 'idEvenement'})

let option={}
// option.force=true
option.alter=true
await sequelize.sync(option)//{force:true}

if(option.force===true) {
    db.role.create({idRole: 1, libelle: "admin"})
    db.role.create({idRole: 2, libelle: "user"})
    db.type_stand.create({idTypeStand: 1, libelleTypeStand: "boutique"})
    db.type_stand.create({idTypeStand: 2, libelleTypeStand: "tournois"})
}
export default db;
