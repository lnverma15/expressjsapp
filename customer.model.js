// const { sequelize, Sequelize } = require('./db.config');

module.exports = (sequelize, Sequelize) => {
    const customers = sequelize.define('customers', {
        // id:{
        //     type:Sequelize.INTEGER,
        //     primaryKey:true,
        //     autoIncrement:true
        // },
        name: {
            type: Sequelize.STRING,
            // allowNull:false
        },
        email: {
            type: Sequelize.STRING,
            primaryKey: true
            // allowNull:false
        },
        // phone:{
        //     type:Sequelize.STRING,
        //     allowNull:false
        // }
        age: {
            type: Sequelize.INTEGER,
            // allowNull:false
        }
    })
    return customers;
}