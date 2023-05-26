import mongoose, { Schema } from "mongoose";

const userImg =
  "https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, requered: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    image: { type: String, default: userImg },
    token: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
