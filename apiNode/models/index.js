import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
})
const db = {sequelize, Sequelize};

// try {
//     await sequelize.authenticate()
// }catch (e) {
//     console.error(e)
//     exit(1)
// }

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

db.produit.belongsTo(db.type_produit, {foreignKey: 'idTypeProduit'})
db.type_produit.hasMany(db.produit, {foreignKey: 'idTypeProduit'})

let option={}
option.force=true
// option.alter=true
await sequelize.sync(option)//{force:true}

if(option.force===true) {
    db.role.create({idRole: 1, libelle: "admin"})
    db.role.create({idRole: 2, libelle: "user"})
    db.type_stand.create({idTypeStand: 1, libelleTypeStand: "boutique"})
    db.type_stand.create({idTypeStand: 2, libelleTypeStand: "tournois"})
    db.type_produit.create({idTypeProduit: 1, libelleTypeProduit: 'Nourriture'})
    db.type_produit.create({idTypeProduit: 2, libelleTypeProduit: 'Boisson'})
    db.type_produit.create({idTypeProduit: 3, libelleTypeProduit: 'Vêtement'})
    db.type_produit.create({idTypeProduit: 4, libelleTypeProduit: 'Accessoire'})
    db.type_produit.create({idTypeProduit: 5, libelleTypeProduit: 'Poster'})
    db.type_produit.create({idTypeProduit: 6, libelleTypeProduit: 'Livre'})
    db.produit.create({idProduit: 1, libelleProduit: 'Crêpe', descriptionProduit: 'Une crêpe faite sur place. Peut être assaisonnée de pâte à tartiner ou de sucre selon choix. PEUT CONTENIR : GLUTEN', prix: 1.90, imageProduit: 'crepe.jpg',idTypeProduit: 1})
    db.produit.create({idProduit: 2, libelleProduit: 'Kinder Bueno', descriptionProduit: 'Gaufrettes enrobée de chocolat et de noisette ', prix: 1.5, imageProduit: 'kbueno.jpg',idTypeProduit: 1})
    db.produit.create({idProduit: 3, libelleProduit: 'Coca-cola', descriptionProduit:  'Boisson sucrée. Rend 120 HP.', prix:2, imageProduit: 'coca.jpg',idTypeProduit: 2})
    db.produit.create({idProduit: 4, libelleProduit: 'Sprite', descriptionProduit: 'limonade au citron et au citron vert.', prix: 2, imageProduit: 'sprite.jpg',idTypeProduit: 2})
    db.produit.create({idProduit: 5, libelleProduit: 'T-Shirt Splatoon 2', descriptionProduit: 'T-Shirt occasionel pour un événement sur Splatoon 2. Taille: L.', prix: 35, imageProduit: 'tshirtsplatoon2.jpg',idTypeProduit:2})
    db.produit.create({idProduit: 6, libelleProduit: 'Porte-clés Defect - Slay the Spire', descriptionProduit: 'Un porte-clés, dont une mini-figurine représentant Le Défecueux de Slay the Spire y est accroché (6cm)', prix: 5, imageProduit: 'portecledefect.jpg',idTypeProduit: 3})
    db.produit.create({idProduit: 7, libelleProduit: 'Poster The Refuge - OneShot', descriptionProduit: 'Poster du jeu OneShot montrant Niko arrivant dans le Refuge. Taille: 24cm*60cm', prix: 9, imageProduit: 'posterrefuge.jpg',idTypeProduit: 4})
    db.produit.create({idProduit: 8, libelleProduit: 'Halo - La chute de Reach', descriptionProduit: 'Livre portant sur lunivers des jeux Halo', prix: 20, imageProduit: 'livrehalolachutedereach.jpg',idTypeProduit: 5})
    db.produit.create({idProduit: 9, libelleProduit: 'Le Journal : Oeuvre de Cedric', descriptionProduit: 'Oeuvre de Cedric', prix: 20, imageProduit: 'lejournal.jpg',idTypeProduit: 5})
}

export default db;
