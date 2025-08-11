import express from "express";
import cors from "cors";
import pdfRouter from "./routes/pdf.routes.js";

const app = express();

const ORIGINS = ["https://dosyahub.com", "https://www.dosyahub.com"];
app.use(cors({ origin: ORIGINS, credentials: true }));
app.options("*", cors({ origin: ORIGINS, credentials: true }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", pdfRouter);

app.use((err, _req, res, _next) => {
  if (err?.message === "ONLY_PDF_ALLOWED") {
    return res.status(400).json({ error: "Yalnızca PDF dosyaları yükleyin." });
  }
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "Maksimum dosya boyutu 20MB." });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ error: "Sunucu hatası." });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
