/* jshint esversion: 8 */
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const { ObjectId } = require('mongodb'); // for _id lookups if needed

// GET all gifts
router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Retrieve the "gifts" collection
        const collection = db.collection("gifts");

        // Task 3: Fetch all gifts
        const gifts = await collection.find({}).toArray();

        // Task 4: Return gifts as JSON
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

// GET a gift by ID
router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Access the "gifts" collection
        const collection = db.collection("gifts");

        const id = req.params.id;

        // Task 3: Find gift by its ID
        // Using "id" field (string ID) – adjust to "_id" if you use ObjectId
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

// POST a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        // Insert the gift document
        const result = await collection.insertOne(req.body);

        // Fetch the inserted document
        const insertedGift = await collection.findOne({ _id: result.insertedId });

        res.status(201).json(insertedGift);
    } catch (e) {
        next(e);
    }
});

module.exports = router;