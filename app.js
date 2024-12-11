const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const TeamMember = require('./models/TeamMember');

// Create Express app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.enable('view cache');

// Configure Handlebars engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {

    try {
        // Fetch services from the database
        const services = await Service.findAll();

        // Fetch testimonials from the database
        const testimonials = await Testimonial.findAll();

        // Fetch team members from the database
        const teamMembers = await TeamMember.findAll();

        res.render('home', {
            pageTitle: 'Digital Experiences',
            hero: {
                title: 'Creando Experiencias Digitales Únicas',
                description: 'Combinamos creatividad y tecnología para revolucionar el mundo digital.',
                buttonText: 'Explora Nuestro Trabajo',
                buttonLink: 'https://www.example.com/'
            },
            mainSection: {
                heading: 'Digital Experiences',
                subheading: 'Sobre Nuestra Empresa',
                description: 'Somos un equipo apasionado por transformar ideas creativas en soluciones digitales innovadoras.'
            },
            services: {
                title: 'Nuestros Servicios',
                list: services.map(service => ({
                    name: service.name,
                    description: service.description,
                    iconClass: service.iconClass
                }))
            },
            testimonials: {
                title: 'Testimonios de Clientes',
                list: testimonials.map(testimonial => ({
                    quote: testimonial.quote,
                    client: testimonial.client
                }))
            },
            team: {
                title: 'Nuestro Equipo',
                subtitle: 'Conoce a nuestro talentoso grupo de profesionales',
                members: teamMembers.map(member => ({
                    image: {src: member.imageUrl, alt: member.name},
                    name: member.name,
                    role: member.role,
                    technologies: member.technologies.split(','), // Assuming technologies are stored as a comma-separated string
                    languages: member.languages.split(','), // Same assumption for languages
                    linkedin: member.linkedin,
                    url: member.url
                }))
            },
            contactSection: {
                title: 'Contáctanos',
                email: 'contacto@digitalexperiences.com',
                phone: '+34 639 123 456',
            }
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
    }
});


// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});