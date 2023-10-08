import { Router } from "express";
import { AuthorsRouter } from "./controllers/authors.js";
import { FilesRouter } from "./controllers/files.js";
import { LoginRouter } from "./controllers/login.js";
import { NotesRouter } from "./controllers/notes.js";

export const router = Router();

router.use("/files", FilesRouter);
router.use("/notes", NotesRouter);
router.use("/authors", AuthorsRouter);
router.use("/login", LoginRouter);
