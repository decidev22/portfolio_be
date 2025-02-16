import express from "express";

import { getActivityList } from "api-github/service/getActivityList.js";
import { getAllEvents } from "db-api/getAllEvents.ts";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_DB_URI ? process.env.MONGO_DB_URI : "";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/getAllEvents", async (req, res) => {
  try {
    const result = await getAllEvents();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/github-activities", async (req, res) => {
  try {
    const result = await getActivityList();
    if (result) {
      res.status(200).json(result);
    }
    if (!result) {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose.Promise = Promise;
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected to database:", mongoose.connection.name);
});
mongoose.connection.on("error", (error: Error) => console.log(error));

console.log("mongo connected");

console.log(mongoose.connection.name); // Log current DB name

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server shut down gracefully");
    process.exit(0);
  });
});
