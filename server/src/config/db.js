import mongoose from "mongoose";
import config from "./environment.js";
const { MONGO_URI } = config;


export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("db connected")
  } catch (error) {
    console.log("failed to connect to db")
    throw error;
  }
}
