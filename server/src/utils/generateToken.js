import jwt from "jsonwebtoken";
import config  from "../config/environment.js";

const JWT_SECRET = config.JWT_SECRET;

export const generateToken = (userId)  => {
    return jwt.sign(
        {id : userId},
        JWT_SECRET,
        {expiresIn: "7D"}
    );
};