export const Type_evenement = (Sequelize,sequelize)=>{
    return sequelize.define('type_evenement', {
        idTypeEvenement: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        libelleTypeEvenement:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })//,{ timestamps: false, freezeTableName: true })
}