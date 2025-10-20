import type { IUser } from "@repo/validation";
import type { Document } from "mongoose";

import { model, Schema } from "mongoose";

export type User = {
  name: string;
  email: string;
} & Document;

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
        delete (ret as Partial<typeof ret>).refreshToken;
        return ret;
      },
    },
  },
);

export const UserModel = model<IUser>("users", userSchema);
