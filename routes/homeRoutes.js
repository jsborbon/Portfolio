const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const TeamMember = require('../models/TeamMember');

router.get('/', async (req, res) => {

    try {
        // Fetch services from the database
        const services = await Service.findAll();

        // Fetch testimonials from the database
        const testimonials = await Testimonial.findAll();

        // Fetch team members from the database
        const teamMembers = await TeamMember.findAll();

        res.render('home', {
            pageTitle: 'Digital Experiences',
            logo:{
                src: 'images/logo.png',
                alt: 'Digital Experiences'
            },
            hero: {
                title: 'Creando Experiencias Digitales Únicas',
                description: 'Combinamos creatividad y tecnología para revolucionar el mundo digital.',
                buttonText: 'Explora Nuestro Trabajo',
                buttonLink: '/projects'
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
                    technologies: member.technologies,
                    languages: member.languages,
                    linkedin: member.linkedin,
                    url: member.url,
                    github: member.github
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


module.exports = router;