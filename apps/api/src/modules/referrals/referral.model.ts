import type { Referral } from "@repo/validation";

import { model, Schema, Types } from "mongoose";

const referralSchema = new Schema({
  referrerId: {
    type: Types.ObjectId,
    required: true,
    ref: "users",
  },
  referredId: {
    type: Types.ObjectId,
    required: true,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["pending", "converted"],
    required: true,
  },
}, {
  timestamps: true,
});

export const ReferralModel = model<Referral>("referrals", referralSchema);
