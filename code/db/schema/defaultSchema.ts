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
  },
});

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const eventSchema = new Schema({
  comments: [CommentSchema],
  newsletter: [NewsletterSchema],
});

export const Event = model("Event", eventSchema);
