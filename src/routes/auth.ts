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
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req: any, res) => {
    const token = req.user.token;
    res.redirect("http://localhost:3000?token=" + token);
  }
);

export default authRouter;
