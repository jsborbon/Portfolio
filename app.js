
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/database');

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const projectsRoutes = require('./routes/projectsRoutes');

// Create Express app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.enable('view cache');

// Configure Handlebars engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Use routes
app.use(homeRoutes);
app.use(projectsRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});