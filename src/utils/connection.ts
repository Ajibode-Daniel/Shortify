import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb+srv://ajibodedaniel477:mgHxMrydSs4vJFxZ@daniel1.ou5v0yq.mongodb.net/?retryWrites=true&w=majority&appName=Daniel1';
    await mongoose.connect(dbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
