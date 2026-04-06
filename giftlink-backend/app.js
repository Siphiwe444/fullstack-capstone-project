/* jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');
const pinoHttp = require('pino-http');

const connectToDatabase = require('./models/db');
const { loadData } = require("./util/import-mongo/index");

// Route files
const giftRoutes = require('./routes/giftRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const logger = require('./logger');
const port = 3060;

// Enable CORS for all routes
app.use("*", cors());

// JSON parser
app.use(express.json());

// Logging middleware
app.use(pinoHttp({ logger }));

// Connect to MongoDB (only once)
connectToDatabase()
    .then(() => {
        pinoLogger.info('Connected to DB');
    })
    .catch((e) => console.error('Failed to connect to DB', e));

// Use Routes
app.use('/api/gifts', giftRoutes);     // Gift routes integrated
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Inside the server");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});