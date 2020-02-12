import passportGoogle from "passport-google-oauth";
import passport from "passport";
import { User, UserDocument, userTypes } from "../models/User";

const GoogleStrategy = passportGoogle.OAuth2Strategy;

const callback = async (
  accessToken: string,
  refreshToken: string,
  profile: passportGoogle.Profile,
  done: passportGoogle.VerifyFunction
) => {
  try {
    const user = await User.findOne({ googleid: profile.id });
    if (user) {
      return done(null, user);
    }

    const verifyEmail = await User.findOne({email: profile.emails[0].value});
    if (verifyEmail) {
      return done(null, accessToken);
    }

    const userData: UserDocument = new User({
      provider: profile.provider,
      providerId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      username: profile.displayName,
      password: null,
      avatar: profile.photos[0].value,
      type: userTypes.USER
    });
    await userData.save();
    return done(null, accessToken);
  } catch (error) {
    console.error(error.message);
    return done(error, false, { message: error.message });
  }
};

const google = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_sECRET,
        callbackURL: `${process.env.SERVER_API_URL}/api/auth/google/callback`
      },
      callback
    )
  );
};

export default google;
