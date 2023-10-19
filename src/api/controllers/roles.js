import { Router } from 'express'
import { Role } from '../models/index.js'
import { tokenExtractor } from '../utils/middleware.js'

export const RolesRouter = Router()

const roleFinder = async (req, res, next) => {
  req.role = await Role.findByPk(req.params.id, { attributes: { exclude: ['createdAt', 'updatedAt'] } })

  if (!req.role) return res.status(404).json({ error: 'role not found' })

  next()
}

RolesRouter.get('/:id', tokenExtractor, roleFinder, async (req, res) => {
  let modules = undefined

  if (req.query.modules) {
    modules = await req.role.getModules({
      attributes: ['name'],
      joinTableAttributes: ['actions']
    })
  }

  res.json({ ...req.role.toJSON(), modules })
})
