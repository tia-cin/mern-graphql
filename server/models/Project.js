import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    id: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
