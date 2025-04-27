// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.listen(3000, () => {
    connectDB();
    console.log('Server started at http://localhost:3000');
});

// console.log(process.env.MONGO_URI);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// pBQOvMfYBOp9rbLt