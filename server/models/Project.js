import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["in progress", "completed", "on hold", "not started"],
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    members: [{ type: Schema.Types.ObjectId, ref: "USer" }],
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
