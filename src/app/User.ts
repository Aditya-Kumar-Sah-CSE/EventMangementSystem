import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["HOST", "ATTENDEE"],
      default: "ATTENDEE",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    image: { type: String },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);