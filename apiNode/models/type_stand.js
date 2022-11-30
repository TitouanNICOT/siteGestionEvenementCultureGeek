export const Type_stand = (Sequelize,sequelize)=>{
    return sequelize.define('type_stand', {
        idTypeStand: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        libelleTypeStand:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })//,{ timestamps: false, freezeTableName: true })
}