export const Emplacement = (Sequelize,sequelize)=>{
    return sequelize.define('emplacement', {
        idEmplacement: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descriptionEmplacement:{
            type: Sequelize.STRING,
            allowNull: false
        },
        x:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        y:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idUser:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idTypeStand:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
}