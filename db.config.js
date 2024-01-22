const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// Models-tables
db.customers = require('./customer.model')(sequelize, Sequelize);
db.users = require('./user.model')(sequelize, Sequelize)

// db.users = require('./user.model')(sequelize, new Sequelize()); // Creating a new Sequelize instance for users



module.exports = db;


