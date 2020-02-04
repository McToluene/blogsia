import { Request, Response } from "express";
import { User } from "../models/User";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../utils/secrets";

export const auth = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const login = async (req: Request, res: Response) => {
  const errorsArray = validationResult(req);
  if (!errorsArray.isEmpty()) {
    return res.status(400).json({ errors: errorsArray.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid login credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid login credentials" }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, SESSION_SECRET, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
