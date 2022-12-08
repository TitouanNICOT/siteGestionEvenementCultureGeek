export const LivreOr = (Sequelize,sequelize)=>{
    return sequelize.define('livreOr', {
        idLivreOr: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        commentaire:{
            type: Sequelize.STRING,
            allowNull: false
        }
    },{freezeTableName: true})
}