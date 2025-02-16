import mongoose from "mongoose";
const { Schema, model } = mongoose;

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
