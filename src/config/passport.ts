import passport from "passport";
import { Application } from "express";
import google from "./google";

const configPassport = async (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  google();
  
};
export default configPassport;
