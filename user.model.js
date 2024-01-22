// user.model.js

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Users;
};
