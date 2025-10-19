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
    refreshToken: { type: String, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete (ret as Partial<typeof ret>).__v;
        delete (ret as Partial<typeof ret>).password;
        return ret;
      },
    },
  },
);

export const UserModel = model<IUser>("users", userSchema);
