export const Tour = (Sequelize, sequelize) => {
    return sequelize.define('tour', {
        idTour: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idJoueur1: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        idJoueur2: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        nTour: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idTourApres: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        gagnant: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    })
}
