import { Router, IRouter } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createPost,
  getAllPosts,
  getPostById,
  deleteById
} from "../controllers/postController";
import { check } from "express-validator";

const postRoutes: IRouter = Router();

// @route   POST api/post
// @desc    Create a post
// @access  private
postRoutes.post(
  "/",
  authMiddleware,
  [
    check("text", "Text is required")
      .not()
      .isEmpty()
  ],
  createPost
);

// @route   GET api/post
// @desc    Get all post
// @access  public
postRoutes.get("/", getAllPosts);

// @route   GET api/post/:id
// @desc    Get post by id
// @access  public
postRoutes.get("/:id", getPostById);

// @route   DELETE api/post/:id
// @desc    Delete post by id
// @access  private
postRoutes.delete("/:id", authMiddleware, deleteById);

// @route   PUT api/post/like/:id
// @desc    Like a post
// @access  private
postRoutes.put("/like/:id", authMiddleware, deleteById);

export default postRoutes;
