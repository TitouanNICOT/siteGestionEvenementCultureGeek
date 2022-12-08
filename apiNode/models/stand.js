export const Stand = (Sequelize,sequelize)=>{
    return sequelize.define('stand', {
        idStand: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descriptionStand:{
            type: Sequelize.STRING,
            allowNull: false
        },
        nomStand:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}