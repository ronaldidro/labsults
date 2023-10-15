import { Router } from 'express'
import { Op } from 'sequelize'
import { Author, Note } from '../models/index.js'
import { tokenExtractor } from '../utils/middleware.js'

export const NotesRouter = Router()

NotesRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.important) {
    where.important = req.query.important === 'true'
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search
    }
  }

  const notes = await Note.findAll({
    attributes: { exclude: ['authorId'] },
    include: { model: Author, attributes: ['name'] },
    where
  })

  res.json(notes)
})

NotesRouter.post('/', tokenExtractor, async (req, res) => {
  try {
    const author = await Author.findByPk(req.decodedToken.id)
    const note = await Note.create({
      ...req.body,
      authorId: author.id,
      date: new Date()
    })

    // const note = Note.build({ ...req.body, date: new Date() })
    // note.authorId = author.id
    // await note.save()

    res.json(note)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
}

NotesRouter.get('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

NotesRouter.put('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    req.note.important = req.body.important
    await req.note.save()
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

NotesRouter.delete('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy()
  }
  res.status(204).end()
})
