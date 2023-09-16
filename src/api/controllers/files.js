import { Router } from "express";
import fs from "fs";
import multer from "multer";
import { FOLDER_ID } from "../utils/config.js";
import { drive } from "../utils/drive.js";

export const FilesRouter = Router();

const upload = multer({ dest: "uploads/" });

FilesRouter.get("/", async (req, res) => {
  try {
    const {
      data: { files },
    } = await drive.files.list({
      q: `'${FOLDER_ID}' in parents`,
      fields: "files(id, name)",
    });

    if (!files.length)
      return res
        .status(500)
        .json({ error: "No se encontraron archivos en la carpeta." });

    res.json(files);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener la lista de archivos." });
  }
});

FilesRouter.get("/download/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const {
      data: { name, mimeType },
    } = await drive.files.get({ fileId });

    const response = await drive.files.get(
      {
        fileId,
        alt: "media",
      },
      { responseType: "stream" }
    );

    const fileName = name || "resultados";
    res.setHeader("Content-disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-type", mimeType);
    response.data.pipe(res);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al descargar el archivo." });
  }
});

FilesRouter.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  try {
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };

    const { data } = await drive.files.create({
      media,
      requestBody: {
        name: file.originalname,
        parents: [FOLDER_ID],
      },
    });

    fs.unlinkSync(file.path);

    res.json({ id: data.id, name: file.originalname });
  } catch (error) {
    res.status(500).json({ error: `Error al subir archivo: ${error}` });
  }
});

FilesRouter.delete("/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    await drive.files.delete({ fileId });
    res.json({ id: fileId }).status(204);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al eliminar el archivo." });
  }
});
