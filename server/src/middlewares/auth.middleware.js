import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decoded.id).select("-__v");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};
