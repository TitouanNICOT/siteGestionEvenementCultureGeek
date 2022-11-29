export const User = (Sequelize,sequelize)=>{
    return sequelize.define('user', {
        idUser: {
            // fields: 'id_user',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom:{
            type: Sequelize.STRING,
            allowNull: false
        },
        prenom:{
            type: Sequelize.STRING,
            allowNull: false
        },
        pseudo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING
        },
        isNotif:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        }//idRole rajouter automatiquement
    })
}