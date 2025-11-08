// src/middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

// 📁 crea automaticamente la cartella uploads se non esiste
const createUploadsDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// configurazione storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/categories";
    createUploadsDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

// filtro: accetta solo immagini
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Solo file immagine consentiti!"), false);
};

export const upload = multer({ storage, fileFilter });
