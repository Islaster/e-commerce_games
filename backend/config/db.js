import mongoose from 'mongoose';

// Set Mongoose to use the built-in JavaScript promises
mongoose.Promise = global.Promise;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    // Log the connection host
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

// Export the connectDB function
export default connectDB;
