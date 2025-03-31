import express, { request } from 'express';
import { PORT, MONGODB_URI } from "./config.js";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

app.use(express.json());

// app.use(cors());

app.use(
    cors({
        origin :'http://localhost:5173',
        methods :['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.get('/', (req, res) => {
    return res.status(234).send(`Server is running on ${PORT}`);
})

app.use('/books', booksRoute);


mongoose.connect(MONGODB_URI).then((req, res) => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
});