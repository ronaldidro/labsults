import { Router } from 'express'
import { AuthenticationRouter } from './controllers/authentication.js'
import { AuthorsRouter } from './controllers/authors.js'
import { FilesRouter } from './controllers/files.js'
import { LoginRouter } from './controllers/login.js'
import { NotesRouter } from './controllers/notes.js'
import { UsersRouter } from './controllers/users.js'

export const router = Router()

router.use('/authentication', AuthenticationRouter)
router.use('/users', UsersRouter)
router.use('/files', FilesRouter)

router.use('/notes', NotesRouter)
router.use('/authors', AuthorsRouter)
router.use('/login', LoginRouter)
