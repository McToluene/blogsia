import mongoose from "mongoose";

export type PostDocument = mongoose.Document & {
  user: string;
  text: string;
  title: string;
  category: string;
  mainfrature: boolean;
  feature: boolean;
  name: string;
  avatar: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: [any];
  comments: [Icomments];
  date: Date;
};

interface Icomments {
  user: string;
  text: string;
  name: string;
  avatar: string;
  date: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: [any];
}

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  mainfeature: {
    type: Boolean,
    required: true
  },

  feature: {
    type: Boolean,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  name: {
    type: String
  },

  avatar: {
    type: String
  },

  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },

      text: {
        type: String,
        required: true
      },

      name: {
        type: String
      },

      avatar: {
        type: String
      },

      date: {
        type: Date,
        default: Date.now
      },

      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ]
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

export const Post = mongoose.model<PostDocument>("posts", PostSchema);
