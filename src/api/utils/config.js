import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const DEV_MODE = process.env.NODE_ENV === "development";
const FOLDER_ID = process.env.FOLDER_ID;
const KEYFILEPATH = resolve(__dirname, "../../../credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

export { DEV_MODE, FOLDER_ID, KEYFILEPATH, SCOPES };
