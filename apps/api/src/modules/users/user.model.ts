import { Schema, model, Document } from "mongoose";
import { IUser } from "@repo/validation";

export interface User extends Document {
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: false },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<IUser>("users", userSchema);
