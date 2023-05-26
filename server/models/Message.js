import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    text: { type: String },
    createdBy: { type: String },
  },
  { timestamps: true }
);

export default model("Message", messageSchema);
