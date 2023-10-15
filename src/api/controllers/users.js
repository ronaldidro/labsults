import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/user.js'
import { tokenExtractor } from '../utils/middleware.js'

export const UsersRouter = Router()

const getPasswordHash = password => bcrypt.hash(password, 10)

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
  })

  if (!req.user) return res.status(404).json({ error: 'user not found' })

  next()
}

UsersRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'document_number', 'first_names', 'last_names']
  })

  res.json(users)
})

UsersRouter.get('/:id', userFinder, async (req, res) => res.json(req.user))

UsersRouter.post('/', async (req, res) => {
  const passwordHash = await getPasswordHash(req.body.password)
  const user = await User.create({ ...req.body, password: passwordHash })

  res.json(user)
})

UsersRouter.patch('/:id', tokenExtractor, userFinder, async (req, res) => {
  let passwordHash = ''

  if (req.body.password) passwordHash = await getPasswordHash(req.body.password)

  const password = req.body.password ? passwordHash : req.user.password

  await req.user.update({ ...req.body, password })
  res.json(req.user)
})

UsersRouter.delete('/:id', tokenExtractor, userFinder, async (req, res) => {
  await req.user.destroy()
  res.status(204).end()
})
