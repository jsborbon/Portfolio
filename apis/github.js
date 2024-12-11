const axios = require('axios');

const getRepos = async (githubUsername) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
        return response.data.map(repo => ({
            name: repo.name,
            summary: `Repositorio de ${githubUsername}`,
            language: repo.language,
            image: {
                src: "images/default-project.jpg",
                alt: repo.name
            },
            url: repo.html_url
        }));
    } catch (error) {
        console.error(`Error fetching repos for ${githubUsername}:`, error);
        return [];
    }
};

module.exports = { getRepos };