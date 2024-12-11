const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('portafolio', 'root','', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;