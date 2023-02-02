export const Stand = (Sequelize, sequelize) => {
    return sequelize.define('stand', {
        idStand: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descriptionStand: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nomStand: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nbPlace: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    },{
        validate: {
            nbPlaceTest(){
                if (this.nbPlace === undefined && [2,3].includes(this.idTypeStand)){
                    throw new Error('Le nombre de place doit être donné')
                }
            }
        }
    })
}