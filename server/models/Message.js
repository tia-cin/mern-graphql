import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    text: String,
  },
  { timestamps: true }
);

export default model("Message", messageSchema);
