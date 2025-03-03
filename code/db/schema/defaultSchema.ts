import mongoose from "mongoose";
const { Schema, model } = mongoose;

// "payload": {
//             "ref": "refs/heads/master",
//             "commits": [
//                 {
//                     "author": {
//                         "email": "hamento22@gmail.com",
//                         "name": "decidev22"
//                     },
//                     "message": "db setup ongoing",
//                     "distinct": false,
//                     "url": "https://api.github.com/repos/decidev22/portfolio_be/commits/e5b83b63742363e595734d00673f3568ae2a7b60"
//                 },

const Author = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
});

const Commit = new Schema({
  author: Author,
});

const Payload = new Schema({
  ref: { type: String, required: true },
  commits: { type: Map, of: Commit, required: true },
  message: { type: String, required: true },
  url: { type: String, required: true },
});

const GhActivitySchema = new mongoose.Schema({
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
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const CommentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  eventId: {
    type: String,
    required: true,
  },
});

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

export const CommentModel = model("Comment", CommentSchema);
export const GhActivityModel = model("Ghactivity", GhActivitySchema);
