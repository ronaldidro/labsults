import { Router } from "express";
import { Author, Note, Team } from "../models/index.js";
import { tokenExtractor } from "../utils/middleware.js";

export const AuthorsRouter = Router();

AuthorsRouter.get("/", async (req, res) => {
  // const adminAuthors = await Author.scope("admin").findAll(); // all admins
  // const disabledAuthors = await Author.scope("disabled").findAll(); // all inactive authors
  // const jamiAuthors = await Author.scope({ method: ["name", "%jami%"] }).findAll(); // authors with the string jami in their name
  // const jamiAuthors = Author.scope('admin', { method: ['name', '%jami%'] }).findAll() // admins with the string jami in their name

  // const jami = await Author.findOne({ name: "Jami Kousa" });
  // const cnt = await jami.number_of_notes();
  // console.log(`Jami has created ${cnt} notes`)
  // const authorsWithNotes = await Author.with_notes(2);
  // console.log(JSON.stringify(authorsWithNotes, null, 2))

  const authors = await Author.findAll({
    attributes: { exclude: [""] },
    include: [
      {
        model: Note,
        attributes: { exclude: ["authorId"] },
      },
      {
        model: Note,
        as: "marked_notes",
        attributes: { exclude: ["authorId"] },
        through: { attributes: [] },
        include: { model: Author, attributes: ["name"] },
      },
      {
        model: Team,
        attributes: ["name", "id"],
        through: { attributes: [] },
      },
    ],
  });

  res.json(authors);
});

AuthorsRouter.post("/", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.json(author);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

AuthorsRouter.get("/:id", async (req, res) => {
  const author = await Author.findByPk(req.params.id, {
    include: { model: Note },
  });

  if (!author) return res.status(404).end();

  let teams = undefined;

  if (req.query.teams) {
    teams = await author.getTeams({
      attributes: ["name"],
      joinTableAttributes: [],
    });
  }

  res.json({ ...author.toJSON(), teams });
});

const isAdmin = async (req, res, next) => {
  const author = await Author.findByPk(req.decodedToken.id);

  if (!author.admin)
    return res.status(401).json({ error: "operation not allowed" });

  next();
};

AuthorsRouter.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const author = await Author.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (author) {
    author.disabled = req.body.disabled;
    await author.save();
    res.json(author);
  } else {
    res.status(404).end();
  }
});
