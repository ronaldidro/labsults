import { Router } from "express";
import jwt from "jsonwebtoken";
import Author from "../models/author.js";
import { SECRET } from "../utils/config.js";

export const LoginRouter = Router();

LoginRouter.post("/", async (request, response) => {
  const body = request.body;

  const author = await Author.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(author && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (author.disabled) {
    return response
      .status(401)
      .json({ error: "account disabled, please contact admin" });
  }

  const authorForToken = {
    username: author.username,
    id: author.id,
  };

  const token = jwt.sign(authorForToken, SECRET);

  response
    .status(200)
    .send({ token, username: author.username, name: author.name });
});
