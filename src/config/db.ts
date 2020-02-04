import mongoose from "mongoose";
import { MONGO_URI } from "../utils/secrets";

const mongoURI = MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.connect(mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
