const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const githubApi = require('../apis/github');
const axios = require("axios");

router.get('/projects', async (req, res) => {
    try {
        // Obtener los miembros del equipo desde la base de datos
        const teamMembers = await TeamMember.findAll();

        // Construir las solicitudes a la API de GitHub para cada miembro
        const repoRequests = teamMembers.map(async member => {
            const githubUsername = member.github;
            try {
                const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
                return response.data.map(repo => ({
                    name: repo.name,
                    summary: `Repositorio de ${githubUsername}`,
                    language: repo.language,
                    image: {
                        src: "images/project.png",
                        alt: repo.name
                    },
                    url: repo.html_url
                }));
            } catch (error) {
                console.error(`Error fetching repos for ${githubUsername}:`, error);
                return [];
            }
        });

        // Esperar a que todas las solicitudes terminen
        const allRepos = await Promise.all(repoRequests);

        // Unir todos los repositorios en un solo array
        const projects = allRepos.flat();

        // Renderizar la página con los proyectos
        res.render('projects', {
            projectsPage: {
                title: "Nuestros Proyectos",
                hero: {
                    title: "Explora Nuestros Proyectos",
                    description: "Conoce las soluciones que hemos desarrollado para transformar ideas en realidades."
                },
                main: {
                    title: "Proyectos Destacados",
                    description: "Aquí están algunos de los proyectos más interesantes en los que hemos trabajado."
                },
                projects
            },
            currentYear: new Date().getFullYear(),
            companyName: "Digital Experiences",
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