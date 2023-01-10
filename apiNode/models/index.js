import {Sequelize} from "sequelize";
import dotenv from "dotenv";
import {insert} from "./insert.js";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false
    }
)
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
import {Type_produit} from "./type_produit.js"
db.type_produit = Type_produit(Sequelize,sequelize)
import {Produit} from "./produit.js"
db.produit = Produit(Sequelize,sequelize)
import {LivreOr} from "./livreOr.js"
db.livreOr = LivreOr(Sequelize,sequelize)
import {ReserverProduit} from "./reserverProduit.js"
db.reserverProduit = ReserverProduit(Sequelize, sequelize)


db.user.belongsTo(db.role, {foreignKey: 'idRole'})
db.role.hasMany(db.user, {foreignKey: 'idRole'})

db.stand.belongsTo(db.type_stand, {foreignKey: 'idTypeStand'})
db.type_stand.hasMany(db.stand, {foreignKey: 'idTypeStand'})

db.stand.belongsTo(db.user, {foreignKey: 'idPrestataire'})
db.user.hasMany(db.stand, {foreignKey: 'idPrestataire'})

db.evenement.belongsTo(db.type_evenement, {foreignKey: 'idTypeEvenement'})
db.type_evenement.hasMany(db.evenement, {foreignKey: 'idTypeEvenement'})

db.evenement.belongsTo(db.stand, {foreignKey: 'idStand'})
db.stand.hasMany(db.evenement, {foreignKey: 'idStand'})

db.produit.belongsTo(db.type_produit, {foreignKey: 'idTypeProduit'})
db.type_produit.hasMany(db.produit, {foreignKey: 'idTypeProduit'})

db.produit.belongsTo(db.stand, {foreignKey: 'idStand'})
db.stand.hasMany(db.produit, {foreignKey: 'idStand'})

db.stand.hasMany(db.livreOr, {foreignKey: 'idStand',as: "livreOr"})
db.livreOr.belongsTo(db.stand, {foreignKey: 'idStand'})

// db.produit.belongsToMany(db.user,{through:db.reserverProduit ,foreignKey: 'idProduit', otherKey: 'idUser', uniqueKey:"idReserveProd"})
// db.user.belongsToMany(db.produit,{through:db.reserverProduit ,foreignKey: 'idUser', otherKey: 'idProduit', uniqueKey:"idReserveProd"})

db.produit.hasMany(db.reserverProduit, {foreignKey: 'idProduit'})
db.reserverProduit.belongsTo(db.produit, {foreignKey: 'idProduit'})

db.user.hasMany(db.reserverProduit, {foreignKey: 'idUser'})
db.reserverProduit.belongsTo(db.user, {foreignKey: 'idUser'})

let option={}
// option.force=true
// option.alter=true
await sequelize.sync(option)//{force:true}

if(option.force===true) {
    console.log("Insertion des données")
    await insert(db)
}
sequelize.options.logging=true;
// des erreurs sont survenues lorsque je ne met pas de await devant les create
// il faudrait peut être faire un await sur chaque create
// ou alors faire un Promise.all ---------PS : phrase genere par Copilot, donc peut etre une solution
// ou alors faire un for await (const element of array) {await element.create()} ---------PS : phrase genere par Copilot, donc peut etre une solution

// quelqu'un m'a dit q'il utilise un script sql pour faire des insertions, en plus d'utiliser sequelize

export default db;
