export const Stand = (Sequelize,sequelize)=>{
    return sequelize.define('stand', {
        idEmplacement: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descriptionEmplacement:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}