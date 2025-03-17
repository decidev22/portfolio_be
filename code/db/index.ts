import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_DB_URI || "";
const isLocal = !process.env.AWS_LAMBDA_FUNCTION_NAME;
let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    try {
      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any);
      isConnected = true;
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error; // Re-throw error to be handled by the caller
    }
  }
}

// This function will return a Promise that resolves once the DB is connected
export const connectToDatabase = async () => {
  if (!isLocal) {
    await connectDB();
  }

  if (isLocal) {
    await connectDB();
    console.log(`MongoDB Connected`);
  }

  return mongoose; // Return the mongoose instance or any relevant DB object
};
