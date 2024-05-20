import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect();
  } catch (error) {
    console.log("Error in DB connection");
  }

  console.log("DB connected with success");
}

export default connectDB;
