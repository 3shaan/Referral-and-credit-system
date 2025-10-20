import type { IUser } from "@repo/validation";
import type { Document } from "mongoose";

import { model, Schema } from "mongoose";

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
    userName: { type: String, required: true, unique: true },
    referredBy: { type: String, required: false },
    stats: {
      totalReferred: { type: Number, default: 0 },
      convertedReferred: { type: Number, default: 0 },
    },

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
