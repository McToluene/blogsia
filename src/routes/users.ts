import { Router } from "express";
import { register } from "../controllers/usersController";
import { check } from "express-validator";

const userRoutes = Router();

// @route   POST api/users
// @desc    Register user
// @access  public
userRoutes.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  register
);

export default userRoutes;
