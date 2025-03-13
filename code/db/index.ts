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
      } as any); // Prevents TypeScript issues
      isConnected = true;
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
}

// Ensure MongoDB is connected before handling Lambda events
if (!isLocal) {
  await connectDB();
}

if (isLocal) {
  await connectDB();
  console.log(`MongoDB Connected`);
}
