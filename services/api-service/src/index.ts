import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectToMongoDB } from '@ai-chat/mongo';
import api from './api';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URI as string);

// Routes
app.use('/v0/api', api);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API service is running on port ${PORT}`);
});
