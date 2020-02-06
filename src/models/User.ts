import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  name: string;
  username: string;
  email: string;
  password: string;
  googleid: string;
  avatar: string;
  token: string;
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  username: {
    type: String
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

  googleid: {
    type: String
  },

  avatar: {
    type: String
  },

  token: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model<UserDocument>("users", UserSchema);
