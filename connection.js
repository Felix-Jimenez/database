const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_URI,
        dialect: 'postgres',
        dialectOptions:{
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);



module.exports = {
    sequelize
}
