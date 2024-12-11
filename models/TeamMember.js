const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TeamMember = sequelize.define('TeamMember', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true, // URL de la imagen del miembro
    },
    technologies: {
        type: DataTypes.JSON, // Array de tecnologías
        allowNull: false,
    },
    languages: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    github: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = TeamMember;