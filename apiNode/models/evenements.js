export const Evenement = (Sequelize,sequelize)=>{
    return sequelize.define('evenement', {
        idEvenement: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelleEvenement:{
            type: Sequelize.STRING,
            allowNull: false
        },
        heureDebut:{
            type: Sequelize.TIMESTAMP,
            allowNull: false
        },
        heureFin:{
            type: Sequelize.TIMESTAMP,
            allowNull: false
        },
        idTypeEvenement:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idEmplacement:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
}