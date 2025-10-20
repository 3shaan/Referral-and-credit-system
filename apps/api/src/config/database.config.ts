import mongoose from "mongoose";
import process from "node:process";

import env from "../env";
import { log } from "../logger";

export async function connectDB() {
  try {
    const mongoUri = env.MONGO_URI || "mongodb://localhost:27017/referral";
    await mongoose.connect(mongoUri);
    log.info(" MongoDB Connected...");
  }
  catch (err) {
    log.error(`Failed to connect to MongoDB${err}`);
    process.exit(1);
  }
}
