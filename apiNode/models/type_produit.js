export const Type_produit = (Sequelize, sequelize) => {
    return sequelize.define('type_produit', {
        idTypeProduit: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        libelleTypeProduit: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {timestamps: false})//,{ timestamps: false, freezeTableName: true })
}