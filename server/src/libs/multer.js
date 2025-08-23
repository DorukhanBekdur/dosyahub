import multer from "multer";
import path from "path";
import { UPLOAD_DIR } from "./paths.js";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

function pdfOnly(_req, file, cb) {
  const ok =
    file.mimetype?.includes("pdf") ||
    file.originalname?.toLowerCase().endsWith(".pdf");
  if (!ok) return cb(new Error("ONLY_PDF_ALLOWED"));
  cb(null, true);
}

export const uploadPdf = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB ile sınırlandırıldı
  fileFilter: pdfOnly,
});
