// db.js
/* jshint esversion: 8 */
require('dotenv').config();
const { MongoClient } = require('mongodb');

// MongoDB connection URL with authentication options from .env
const url = process.env.MONGO_URL;

// Database instance (singleton)
let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    // Return existing instance if already connected
    if (dbInstance) {
        return dbInstance;
    }

    const client = new MongoClient(url);

    try {
        // Task 1: Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Task 2: Connect to database giftdb and store in variable dbInstance
        dbInstance = client.db(dbName);

        // Task 3: Return database instance
        return dbInstance;

    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
}

module.exports = connectToDatabase;