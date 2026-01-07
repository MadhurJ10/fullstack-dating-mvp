import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { generateToken } from "../utils/generateToken.js";
import userModel from "../models/user.model.js";
import config from "./environment.js"

const { GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET }  = config


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // callbackURL: "/auth/google/callback"
      callbackURL: "https://fullstack-dating-mvp-production.up.railway.app/auth/google/callback"

    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          user = await userModel.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
          });
        }

        // generate JWT
        const token = generateToken(user._id);

        return done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;
