import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// const DB = mongoose.model('')

mongoose.connect(process.env.MONGO_DB_URI ? process.env.MONGO_DB_URI : "");
