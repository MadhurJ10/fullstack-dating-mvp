import express from "express";
import passport from "passport";
import config  from "../config/environment.js";


const {CLIENT_URL } = config 
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;

    // redirect to frontend with token
    res.redirect(
      `${CLIENT_URL}/oauth-success?token=${token}`
    );
  }
);

export default router;
