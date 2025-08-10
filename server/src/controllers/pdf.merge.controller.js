import fs from "fs/promises";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { OUTPUT_DIR } from "../libs/paths.js";

export async function mergeTwoPdfs(req, res) {
  try {
    const f1 = req.files?.file1?.[0];
    const f2 = req.files?.file2?.[0];
    if (!f1 || !f2) {
      return res.status(400).json({ error: "Lütfen iki PDF yükleyin." });
    }

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

    await Promise.allSettled([fs.unlink(f1.path), fs.unlink(f2.path)]);

    return res.json({ fileId: filename });
  } catch (err) {
    console.error("mergeTwoPdfs error:", err);
    return res.status(500).json({ error: "Birleştirme başarısız." });
  }
}
