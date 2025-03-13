import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import dotenv from "dotenv";
import serverless from "serverless-http";
import router from "../code/router/index.ts";

dotenv.config();

const mongoUrl = process.env.MONGO_DB_URI || "";
const isLocal = !process.env.AWS_LAMBDA_FUNCTION_NAME;

const app = express();
app.use(compression());
app.use("/", router());

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
  const port = process.env.PORT || 3001;
  app.listen(port, async () => {
    await connectDB();
    console.log(`Local server running on http://localhost:${port}`);
  });
}

export const lambdaHandler = serverless(app);
