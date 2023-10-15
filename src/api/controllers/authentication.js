import bcrypt from 'bcrypt'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { Role, User } from '../models/index.js'
import { SECRET } from '../utils/config.js'

export const AuthenticationRouter = Router()

AuthenticationRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: { username },
    attributes: ['id', 'document_number', 'last_names', 'first_names', 'password'],
    include: { model: Role, attributes: ['id', 'name'], through: { attributes: [] } }
  })

  const passwordCorrect = user ? await bcrypt.compare(password, user.password) : false

  if (!(user && passwordCorrect)) return res.status(401).json({ error: 'invalid username or password' })

  delete user.dataValues.password

  const token = jwt.sign(user.dataValues, SECRET, { expiresIn: '1d' })

  res.status(200).send({ token })
})
