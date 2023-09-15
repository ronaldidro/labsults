import { google } from "googleapis";
import { KEYFILEPATH, SCOPES } from "./config.js";

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export const drive = google.drive({ version: "v3", auth });
