import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { connectToDatabase } from './db/index.js'
import { router } from './routes.js'
import { DEV_MODE } from './utils/config.js'
import { errorHandler, unknownEndpoint } from './utils/middleware.js'

export const api = express()

connectToDatabase()

if (DEV_MODE) {
  morgan.token('body', req => JSON.stringify(req.body))
  api.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))
}

api.use(express.json())
api.use(express.urlencoded({ extended: false }))

api.use(router)

api.use(unknownEndpoint)
api.use(errorHandler)
