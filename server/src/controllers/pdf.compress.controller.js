import fs from "fs/promises";
import path from "path";
import { promisify } from "util";
import { execFile } from "child_process";
import { PDFDocument } from "pdf-lib";
import { OUTPUT_DIR } from "../libs/paths.js";

const execFileAsync = promisify(execFile);

function buildGhostscriptArgs(inputPath, outputPath, quality = 70) {
  const q = Math.max(30, Math.min(90, Number(quality) || 70));

  const lerp = (a, b, t) => Math.round(a + (b - a) * t);
  const t = (q - 30) / 60;
  const dpi = lerp(92, 240, t);

  const jpegQ = q;

  return [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    "-dPDFSETTINGS=/default",
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",

    "-dColorImageDownsampleType=/Average",
    "-dGrayImageDownsampleType=/Average",
    "-dMonoImageDownsampleType=/Subsample",

    `-dColorImageResolution=${dpi}`,
    `-dGrayImageResolution=${dpi}`,
    `-dMonoImageResolution=${Math.max(150, dpi)}`,

    "-dDownsampleColorImages=true",
    "-dDownsampleGrayImages=true",
    "-dDownsampleMonoImages=true",

    "-dEncodeColorImages=true",
    "-dEncodeGrayImages=true",
    "-dEncodeMonoImages=true",

    `-dJPEGQ=${jpegQ}`,

    `-sOutputFile=${outputPath}`,
    inputPath,
  ];
}

/**
 * Ghostscript ile gerçek sıkıştırma.
 */
async function tryGhostscriptCompress(inPath, outPath, quality) {
  const args = buildGhostscriptArgs(inPath, outPath, quality);
  await execFileAsync("gs", args);
}

/**
 * pdf-lib fallback: sayfaları yeniden kaydedip optimize eder.
 */
async function pdfLibFallback(inPath, outPath) {
  const input = await fs.readFile(inPath);
  const src = await PDFDocument.load(input, { updateMetadata: false });
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, src.getPageIndices());
  pages.forEach((p) => out.addPage(p));

  const bytes = await out.save({ useObjectStreams: true });
  await fs.writeFile(outPath, bytes);
}

export async function compressPdf(req, res) {
  const f = req.file;
  const quality = req.body?.quality;

  if (!f) return res.status(400).json({ error: "Lütfen bir PDF yükleyin." });
  if (
    !f.mimetype?.includes("pdf") &&
    !f.originalname?.toLowerCase().endsWith(".pdf")
  ) {
    await fs.unlink(f.path).catch(() => {});
    return res.status(400).json({ error: "Yalnızca PDF dosyaları yükleyin." });
  }

  const beforeBytes = (await fs.stat(f.path)).size;

  const MIN_BYTES = 5 * 1024 * 1024;
  if (beforeBytes < MIN_BYTES) {
    await fs.unlink(f.path).catch(() => {});
    return res.status(400).json({
      error: "Dosya zaten küçük (5 MB altı). Sıkıştırmaya gerek yok.",
    });
  }

  const outName = `compressed-${Date.now()}.pdf`;
  const outPath = path.join(OUTPUT_DIR, outName);

  try {
    let engine = "gs";

    try {
      await tryGhostscriptCompress(f.path, outPath, quality);
    } catch (gsErr) {
      engine = "pdf-lib";
      try {
        await pdfLibFallback(f.path, outPath);
      } catch (libErr) {
        console.error("compressPdf fallback error:", libErr);
        return res.status(422).json({
          error: "PDF sıkıştırılamadı. Dosya bozuk/şifreli olabilir.",
        });
      }
    }

    const afterBytes = (await fs.stat(outPath)).size;

    if (afterBytes >= beforeBytes) {
      await fs.unlink(outPath).catch(() => {});
      await fs.unlink(f.path).catch(() => {});
      return res.status(400).json({
        error: "Sıkıştırma fayda sağlamadı (dosya küçülmedi).",
      });
    }

    await fs.unlink(f.path).catch(() => {});

    return res.json({
      fileId: outName,
      beforeBytes,
      afterBytes,
      engine,
    });
  } catch (err) {
    console.error("compressPdf error:", err);
    await fs.unlink(f.path).catch(() => {});
    return res.status(500).json({ error: "Sıkıştırma başarısız." });
  }
}
