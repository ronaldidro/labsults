import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { SECRET } from "../utils/config.js";

export const AuthenticationRouter = Router();

AuthenticationRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.password)
    : false;

  if (!(user && passwordCorrect))
    return res.status(401).json({ error: "invalid username or password" });

  const userForToken = {
    id: user.id,
    document_number: user.document_number,
    first_names: user.first_names,
    last_names: user.last_names,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: "1d" });

  res.status(200).send({ token });
});
