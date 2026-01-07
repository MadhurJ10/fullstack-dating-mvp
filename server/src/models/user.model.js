import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    name: {
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

    avatar: {
      type: String
    },

    bio: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
