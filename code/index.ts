import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "router/index.ts";

dotenv.config();

const mongoUrl = process.env.MONGO_DB_URI ? process.env.MONGO_DB_URI : "";

const app = express();
const port = process.env.PORT || 3001;

app.use(compression());

mongoose.Promise = Promise;
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected to database:", mongoose.connection.name);
});
mongoose.connection.on("error", (error: Error) => console.log(error));

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Attempt to resolve local port being occupied even after it being shut down
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server shut down gracefully");
    process.exit(0);
  });
});

app.use("/", router());
