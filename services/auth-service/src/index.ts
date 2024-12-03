import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectToMongoDB } from '@ai-chat/mongo';
dotenv.config();

import api from './api';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URI as string);

// Routes
app.use('/v0/auth', api);

const PORT = process.env.PORT || 3002; // Use a different port for the auth service
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
