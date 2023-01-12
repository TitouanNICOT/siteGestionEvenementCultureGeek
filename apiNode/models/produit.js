export const Produit = (Sequelize, sequelize) => {
    return sequelize.define('produit', {
        idProduit: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        libelleProduit: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descriptionProduit: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prix: {
            type: Sequelize.DECIMAL(6, 2),
            allowNull: false
        },
        imageProduit: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}