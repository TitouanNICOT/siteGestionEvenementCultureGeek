export const Reservation = (Sequelize, sequelize) => {
    return sequelize.define('reservation', {
        idUser: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        idEvenement: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    })
}