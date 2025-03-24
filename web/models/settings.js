import { model, Schema } from "mongoose";

const settingsSchema = new Schema({
  shopName: String,
  ip: String,
  port: Number,
  user: String,
  password: String,
});

export const Settings = model("settings", settingsSchema);
