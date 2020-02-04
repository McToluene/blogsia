import mongoose from "mongoose";

export type ProfileDocument = mongoose.Document & {
  user: mongoose.Schema.Types.ObjectId;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: [string];
  bio: string;
  githubusername: string;
  experience: [IexperienceObject];
  education: [IeducationObject];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  social: any;
  date: Date;
};

type history = {
  from: Date;
  to: Date;
  current: boolean;
  description: string;
};

export interface IexperienceObject extends history {
  title: string;
  company: string;
  location: string;
}

export interface IeducationObject extends history {
  school: string;
  degree: string;
  fieldofstudy: string;
}

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  company: {
    type: String
  },

  website: {
    type: String
  },

  location: {
    type: String
  },

  status: {
    type: String,
    required: true
  },

  skills: {
    type: [String],
    required: true
  },

  bio: {
    type: String
  },

  githubusername: {
    type: String
  },

  experience: [
    {
      title: {
        type: String,
        required: true
      },

      company: {
        type: String,
        required: true
      },

      location: {
        type: String
      },

      from: {
        type: Date,
        required: true
      },

      to: {
        type: Date
      },

      current: {
        type: Boolean,
        default: false
      },

      description: {
        type: String
      }
    }
  ],

  education: [
    {
      school: {
        type: String,
        required: true
      },

      degree: {
        type: String,
        required: true
      },

      fieldofstudy: {
        type: String,
        required: true
      },

      from: {
        type: Date,
        required: true
      },

      to: {
        type: Date
      },

      current: {
        type: Boolean,
        default: false
      },

      description: {
        type: String
      }
    }
  ],

  social: {
    youtube: {
      type: String
    },

    twitter: {
      type: String
    },

    facebook: {
      type: String
    },

    linkedin: {
      type: String
    },

    instagram: {
      type: String
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export const Profile = mongoose.model<ProfileDocument>(
  "profiles",
  ProfileSchema
);
