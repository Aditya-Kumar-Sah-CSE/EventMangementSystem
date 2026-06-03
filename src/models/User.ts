import mongoose, { Schema, type Model } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: "HOST" | "ATTENDEE";
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["HOST", "ATTENDEE"], default: "ATTENDEE" },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export type UserModel = Model<IUser>;

const User = (mongoose.models.User as UserModel) || mongoose.model<IUser>("User", UserSchema);
export default User;
