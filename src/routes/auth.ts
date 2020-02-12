import Router from "express";
import { auth, login } from "../controllers/authContoller";
import { authMiddleware } from "../middleware/auth";
import { check } from "express-validator";
import passport from "passport";

const authRouter = Router();

// @route GET api/auth
// @desc      Test route
// @access    Public
authRouter.get("/", authMiddleware, auth);

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  public
authRouter.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  login
);

// @route   GET api/auth/google
// @desc    Authenticate user and get token
// @access  public
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req: any, res) => {
    const {user} = req;
    const token= user;
    res.json({token}).redirect("http://localhost:3000?token=" + token);
    // return res.json({token});
  }
);

export default authRouter;
