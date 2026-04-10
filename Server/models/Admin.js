import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    phone: {
      type: String
    },

    location: {
      type: String
    },

    jobTitle: {
      type: String
    },

    username: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },
    profileUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;