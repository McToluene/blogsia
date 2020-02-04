import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model<UserDocument>("users", UserSchema);
