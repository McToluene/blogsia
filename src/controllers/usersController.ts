import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import logger from "../utils/logger";
import { SESSION_SECRET } from "../utils/secrets";

export const register = async (req: Request, res: Response) => {
  const errorsArray = validationResult(req);
  if (!errorsArray.isEmpty()) {
    return res.status(400).json({ errors: errorsArray.array() });
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    user = new User({
      name,
      email,
      password,
      avatar
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, SESSION_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send("Server Error");
  }
};
