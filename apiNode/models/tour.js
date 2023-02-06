//v1=2joueur par ligne
//v2=1joueur par ligne (->donc deux ligne)
//v3=table en plus
export const Tour = (Sequelize, sequelize) => {
    return sequelize.define('tour', {
        idTour: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idJoueur: { //v1 et v2
            type: Sequelize.INTEGER,
            allowNull: true
        },
        // idJoueur2: { //v1
        //     type: Sequelize.INTEGER,
        //     allowNull: true
        // },
        // nTour: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        // },
        idTourApres: { //v1 et v2
            type: Sequelize.INTEGER,
            allowNull: true
        },
        // gagnant: { //v1
        //     type: Sequelize.INTEGER,
        //     allowNull: true
        // }
    },{timestamps:false})
}
