import { config } from 'dotenv'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

config()

const __dirname = dirname(fileURLToPath(import.meta.url))

const DEV_MODE = process.env.NODE_ENV === 'development'
const PRD_MODE = process.env.NODE_ENV === 'production'
const TEST_MODE = process.env.NODE_ENV === 'test'
const DATABASE_URL = DEV_MODE
  ? process.env.DEV_DATABASE_URL
  : TEST_MODE
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL
const FOLDER_ID = process.env.FOLDER_ID
const SECRET = process.env.SECRET
const GQL_PORT = process.env.VITE_GQL_PORT
const KEY_FILE_PATH = resolve(__dirname, '../../../credentials.json')
const SCOPES = ['https://www.googleapis.com/auth/drive']

export { DATABASE_URL, DEV_MODE, FOLDER_ID, GQL_PORT, KEY_FILE_PATH, PRD_MODE, SCOPES, SECRET }
