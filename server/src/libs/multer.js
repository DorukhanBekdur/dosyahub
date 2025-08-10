import multer from "multer";
import { UPLOAD_DIR } from "./paths.js";

export const uploadPdf = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB Limitledim.
  fileFilter: (req, file, cb) => {
    const ok =
      file.mimetype === "application/pdf" ||
      (file.originalname || "").toLowerCase().endsWith(".pdf");
    if (ok) cb(null, true);
    else cb(new Error("ONLY_PDF_ALLOWED"));
  },
});
