import { google } from 'googleapis'
import { KEY_FILE_PATH, SCOPES } from './config.js'

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES
})

export const drive = google.drive({ version: 'v3', auth })
