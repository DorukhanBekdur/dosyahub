import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { PDFDocument } from "pdf-lib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const UPLOAD_DIR = path.join(__dirname, "../uploads");
const OUTPUT_DIR = path.join(__dirname, "../outputs");
await fs.mkdir(UPLOAD_DIR, { recursive: true });
await fs.mkdir(OUTPUT_DIR, { recursive: true });

const upload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: 50 * 1024 * 1024 }, //MAX 50MB
  fileFilter: (req, file, cb) => {
    const ok =
      file.mimetype === "application/pdf" ||
      (file.originalname || "").toLowerCase().endsWith(".pdf");
    cb(ok ? null : new multer.MulterError("LIMIT_UNEXPECTED_FILE", "pdf"), ok);
  },
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const twoPdfs = upload.fields([
  { name: "file1", maxCount: 1 },
  { name: "file2", maxCount: 1 },
]);

app.post("/api/merge/pdf", twoPdfs, async (req, res) => {
  try {
    const f1 = req.files?.file1?.[0];
    const f2 = req.files?.file2?.[0];
    if (!f1 || !f2)
      return res.status(400).json({ error: "Lütfen iki PDF yükleyin." });

    const [b1, b2] = await Promise.all([
      fs.readFile(f1.path),
      fs.readFile(f2.path),
    ]);

    const merged = await PDFDocument.create();

    const pdf1 = await PDFDocument.load(b1);
    const pdf2 = await PDFDocument.load(b2);

    const pages1 = await merged.copyPages(pdf1, pdf1.getPageIndices());
    pages1.forEach((p) => merged.addPage(p));

    const pages2 = await merged.copyPages(pdf2, pdf2.getPageIndices());
    pages2.forEach((p) => merged.addPage(p));

    const outBytes = await merged.save();

    const filename = `merged-${Date.now()}.pdf`;
    const outPath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(outPath, outBytes);
    await Promise.all([fs.unlink(f1.path), fs.unlink(f2.path)]);

    res.json({ fileId: filename });
  } catch (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "Maksimum dosya boyutu 50MB." });
      }
      return res
        .status(400)
        .json({ error: "Geçersiz dosya / yükleme hatası." });
    }
    console.error(err);
    res.status(500).json({ error: "Birleştirme başarısız." });
  }
});

{
  /* Download Section */
}
app.get("/api/download/:fileId", async (req, res) => {
  const file = path.join(OUTPUT_DIR, req.params.fileId);
  res.download(file, req.params.fileId);
});

const PORT = 5001;
app.listen(PORT, () =>
  console.log("PDF Merge API running on http://localhost:" + PORT)
);
