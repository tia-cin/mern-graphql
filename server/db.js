import mongoose from "mongoose";
// import { MONGODB_URL } from "./config";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost/mern-graphql-db");
    console.log(`>> DB conected ${conn.connect.name}`);
  } catch (error) {
    console.log(">> Error connecting DB", error);
    process.exit(1);
  }
};
