import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User, UserDocument } from "../models/User";
import { PostDocument, Post } from "../models/Post";
import logger from "../utils/logger";

export const createPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user: UserDocument = await User.findById(req.body.user.id).select(
      "-password"
    );

    const newPost: PostDocument = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.body.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    logger.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //check on the user
    if (post.user.toString() != req.body.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (error) {
    logger.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Chekc if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.body.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.body.user.id });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Server Error");
  }
};
