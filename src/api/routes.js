import { Router } from "express";
import { FilesRouter } from "./controllers/files.js";

export const router = Router();

router.use("/files", FilesRouter);
