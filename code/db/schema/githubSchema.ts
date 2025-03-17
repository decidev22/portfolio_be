import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Author = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
});

const Commit = new Schema({
  author: Author,
});

const Payload = new Schema({
  ref: { type: String },
  commits: [{ type: Commit }],
  message: { type: String },
  url: { type: String },
});

export const GhActivitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  actor: {
    type: String,
  },
  repo_name: {
    type: String,
    required: true,
  },
  repo_url: {
    type: String,
    required: true,
  },
  payload: {
    type: Payload,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
});

export const GhActivityModel = model("Ghactivity", GhActivitySchema);
