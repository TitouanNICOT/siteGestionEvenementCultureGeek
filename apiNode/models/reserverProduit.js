export const ReserverProduit = (Sequelize,sequelize)=>{
    return sequelize.define('reserverProduit', {
        quantite: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
}