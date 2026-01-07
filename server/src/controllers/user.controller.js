import userModel from "../models/user.model.js";

export const getMe = (req, res) => {
  res.status(200).json(req.user);
};

export const getProfiles = async (req, res) => {
  try {
    const users = await userModel.find({
      _id: { $ne: req.user._id } // exclude logged-in user
    }).select("name avatar bio");

    res.status(200).json(users);
  } catch (error) {
    console.error("Get profiles error:", error);
    res.status(500).json({
      message: "Failed to fetch profiles"
    });
  }
};
