import { connect } from "mongoose";

export const connectDb = async () => {
  const connection = await connect(process.env.MONGO_URI);

  console.log("Connected to database.");
};
