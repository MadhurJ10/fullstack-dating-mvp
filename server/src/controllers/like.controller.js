import mongoose from "mongoose";
import Like from "../models/like.model.js";
import Match from "../models/match.model.js";

export const likeUser = async (req, res) => {
  try {
    const fromUser = req.user._id;
    const toUser = req.params.userId;

    
    if (!mongoose.Types.ObjectId.isValid(toUser)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    
    if (fromUser.equals(toUser)) {
      return res.status(400).json({ message: "You cannot like yourself" });
    }

    
    const alreadyLiked = await Like.findOne({
      from: fromUser,
      to: toUser,
    });

    if (alreadyLiked) {
      return res.status(200).json({
        matched: false,
        message: "Already liked",
      });
    }

    
    await Like.create({
      from: fromUser,
      to: toUser,
    });

    
    const mutualLike = await Like.findOne({
      from: toUser,
      to: fromUser,
    });

    if (mutualLike) {
      await Match.create({
        users: [fromUser, toUser],
      });

      return res.status(200).json({
        matched: true,
        message: "It's a match 🎉",
      });
    }

    return res.status(200).json({
      matched: false,
      message: "Like sent",
    });

  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      users: req.user._id,
    }).populate("users", "name avatar bio");

    res.status(200).json(matches);
  } catch (error) {
    console.error("Get matches error:", error);
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};
