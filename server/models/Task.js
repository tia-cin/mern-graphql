import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["in progress", "completed", "pending", "not assigned"],
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Taks", taskSchema);
