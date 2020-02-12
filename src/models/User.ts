import mongoose from "mongoose";

export enum userTypes {
  ADMIN,
  WRITER,
  USER

}
export type UserDocument = mongoose.Document & {
  name: string;
  username: string;
  email: string;
  password: string;
  provider: string;
  providerId: string;
  avatar: string;
  type: userTypes;
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
  },

  provider: {
    type: String
  },

  avatar: {
    type: String
  },

  providerId: {
    type: String
  },

  type:{
    type: userTypes,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model<UserDocument>("users", UserSchema);
