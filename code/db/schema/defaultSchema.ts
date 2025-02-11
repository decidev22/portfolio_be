import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  email: String,
  name: String,
  text: String,
  eventId: String,
});

const Event = model("Event", eventSchema);
export default Event;
