import mongoose from "mongoose";

const educatorRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  name: String,
  email: String,
  image: String, // profile image URL

  experience: String,
  skills: String,
  portfolio: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("EducatorRequest", educatorRequestSchema);