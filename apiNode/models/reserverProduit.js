export const ReserverProduit = (Sequelize, sequelize) => {
    return sequelize.define('reserverProduit', {
        quantite: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idReserveProd: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })
}