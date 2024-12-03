import mongoose from 'mongoose';

export const connectToMongoDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export { mongoose };

export * from './models/User';
export * from './models/Message';
export * from './models/Conversation';
