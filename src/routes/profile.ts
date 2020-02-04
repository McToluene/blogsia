import { Router } from "express";
import {
  getProfile,
  createUpdateProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
  addExperience,
  deleteExperience,
  deleteEducation,
  addEducation
} from "../controllers/profileController";
import { authMiddleware } from "../middleware/auth";
import { check } from "express-validator";

const profileRoutes = Router();

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  private
profileRoutes.get("/me", authMiddleware, getProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  private
profileRoutes.post(
  "/",
  authMiddleware,
  [
    check("status", "Status is required")
      .not()
      .isEmpty(),
    check("skills", "Skills is required")
      .not()
      .isEmpty()
  ],
  createUpdateProfile
);

// @route   GET api/profile
// @desc    Get all users profile
// @access  public
profileRoutes.get("/", getAllProfiles);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  public
profileRoutes.get("/user/:user_id", getProfileById);

// @route   DELETE api/profile
// @desc    DELETE profile, user & post
// @access  private
profileRoutes.delete("/", authMiddleware, deleteProfile);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  private
profileRoutes.put(
  "/experience",
  authMiddleware,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("company", "Company is required")
      .not()
      .isEmpty(),
    check("from", "From date is required")
      .not()
      .isEmpty()
  ],
  addExperience
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    DELETE experience from profile
// @access  private
profileRoutes.delete("/experience/:exp_id", authMiddleware, deleteExperience);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  private
profileRoutes.put(
  "/education",
  authMiddleware,
  [
    check("school", "School is required.")
      .not()
      .isEmpty(),
    check("degree", "Degree is required.")
      .not()
      .isEmpty(),
    check("fieldofstudy", "Field of study is required.")
      .not()
      .isEmpty(),
    check("from", "From date is required.")
      .not()
      .isEmpty()
  ],
  addEducation
);

// @route   DELETE api/profile/education/:edu_id
// @desc    DELETE education from profile
// @access  private
profileRoutes.delete("/education/:edu_id", authMiddleware, deleteEducation);

export default profileRoutes;
