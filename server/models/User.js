import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, requered: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);