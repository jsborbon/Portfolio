const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
    quote: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Testimonial;