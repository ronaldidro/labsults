import jwt from "jsonwebtoken";
import { SECRET } from "./config.js";
import { error as logger } from "./logger.js";

const unknownEndpoint = (_req, res) =>
  res.status(404).send({ error: "unknown endpoint" });

const errorHandler = (error, _req, res, next) => {
  logger("=*= Error Handler =*=", error.name, error.message);

  if (error.name === "JsonWebTokenError")
    return res.status(422).json({ error: "invalid token" });

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  next();
};

export { errorHandler, tokenExtractor, unknownEndpoint };
