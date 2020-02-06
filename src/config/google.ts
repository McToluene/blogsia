import GoogleStrategy from "passport-google-oauth";
import passport from "passport";
import { User } from "../models/User";
import logger from "../utils/logger";

const Strategy = GoogleStrategy.OAuth2Strategy;

const callback = async (
  accessToken: string,
  refreshToken: string,
  profile: GoogleStrategy.Profile,
  done: GoogleStrategy.VerifyFunction
) => {
  try {
    const user = await User.findOne({ googleid: profile.id });
    if (user) {
      return done(null, user, { message: "User" });
    }

    const username = profile.displayName.split(" ");
    const userData = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      username: username[0],
      token: accessToken,
      googleId: profile.id,
      avatar: profile.photos[0].value
    });

    logger.debug(profile._json);
    logger.debug(profile.toString());
    await userData.save();
  } catch (error) {
    console.error(error.message);
    return done(error, false, { message: error.message });
  }
};

const google = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_sECRET,
        callbackURL: "/api/auth/google/callback"
      },
      callback
    )
  );
};

export default google;
