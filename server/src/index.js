import "dotenv/config";
import express from "express";
import cors from "cors";
import { assertJwtConfigured } from "./lib/jwt.js";
import authRouter from "./routes/auth.routes.js";
import pdfRouter from "./routes/pdf.routes.js";

assertJwtConfigured();

const app = express();

const PRODUCTION_ORIGINS = [
  "https://dosyahub.com",
  "https://www.dosyahub.com",
];
const DEV_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

const allowList =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_ORIGINS
    : [...PRODUCTION_ORIGINS, ...DEV_ORIGINS];

const corsConfig = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowList.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRouter);
app.use("/api", pdfRouter);

app.use((err, _req, res, _next) => {
  if (err?.message === "ONLY_PDF_ALLOWED") {
    return res.status(400).json({ error: "Yalnızca PDF dosyaları yükleyin." });
  }
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "Maksimum dosya boyutu 100MB." });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ error: "Sunucu hatası." });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
