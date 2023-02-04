export const Tournoi = (Sequelize, sequelize) => {
    return sequelize.define('tournoi', {
        idTournoi: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nomTournoi: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nbTour: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nbJoueur: {
            type: Sequelize.VIRTUAL,
            get() {
                return Math.pow(2,this.nbTour)
            }
        }
    })
}
