const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Register routes
app.use('/users', userRoutes); // Base route for users
app.use('/posts', postRoutes); // Base route for posts

// Sync database and start the server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => console.error('Error syncing database:', err));
