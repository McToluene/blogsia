import Router from "express";
import { auth, login } from "../controllers/authContoller";
import { authMiddleware } from "../middleware/auth";
import { check } from "express-validator";

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

export default authRouter;
