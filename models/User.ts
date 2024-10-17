import mongoose, { Schema } from "mongoose";
import { UserType } from "@/lib/types";

const UserSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User =
  mongoose.models?.User || mongoose.model<UserType>("User", UserSchema);
export default User;
