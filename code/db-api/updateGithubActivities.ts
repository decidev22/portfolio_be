import mongoose from "mongoose";
import { GhActivityModel } from "../db/schema/defaultSchema.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URI ? process.env.MONGO_DB_URI : "");

// Create a new blog post object
const article = new GhActivityModel({
  email: "test_email@test.com",
  name: "Andy Baeck",
  text: "This is my new Portfolio",
  eventId: "event 000",
});

async function insertGithubActivitiesData() {
  // Insert the article in our MongoDB database
  await article.save();
}
