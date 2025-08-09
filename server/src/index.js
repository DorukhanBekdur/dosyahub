import express from "express";
import cors from "cors";
import pdfRouter from "./routes/pdf.routes.js";

// App
const app = express();
app.use(cors());

// API routes
app.use("/api", pdfRouter);

// Global error handler - her zaman JSON döndür
app.use((err, req, res, next) => {
  if (err?.message === "ONLY_PDF_ALLOWED") {
    return res.status(400).json({ error: "Yalnızca PDF dosyaları yükleyin." });
  }
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "Maksimum dosya boyutu 50MB." });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ error: "Sunucu hatası." });
});

const PORT = 5001;
app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
