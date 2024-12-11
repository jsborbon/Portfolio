const sequelize = require('./config/database');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const TeamMember = require('./models/TeamMember');

// Sincroniza las tablas
sequelize.sync({ force: false }) // Usar { force: true } para eliminar y recrear las tablas
    .then(() => {
        console.log('Base de datos y tablas sincronizadas');
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });