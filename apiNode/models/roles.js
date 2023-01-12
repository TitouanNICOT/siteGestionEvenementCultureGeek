export const Role = (Sequelize, sequelize) => {
    return sequelize.define('roles', {
        idRole: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {timestamps: false, freezeTableName: true})
}