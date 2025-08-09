import fs from "fs/promises";
import path from "path";
import { PDFDocument } from "pdf-lib";
import archiver from "archiver";
import { OUTPUT_DIR } from "../libs/paths.js";

export async function splitPdf(req, res) {
  try {
    const file = req.file;
    if (!file)
      return res.status(400).json({ error: "Lütfen bir PDF yükleyin." });

    const pdfBytes = await fs.readFile(file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const folderId = `split-${Date.now()}`;
    const splitDir = path.join(OUTPUT_DIR, folderId);
    await fs.mkdir(splitDir, { recursive: true });

    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      const out = await PDFDocument.create();
      const [page] = await out.copyPages(pdfDoc, [i]);
      out.addPage(page);
      const bytes = await out.save();
      await fs.writeFile(path.join(splitDir, `page-${i + 1}.pdf`), bytes);
    }

    await fs.unlink(file.path);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${folderId}.zip"`
    );
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.on("error", (e) => {
      throw e;
    });
    archive.pipe(res);
    archive.directory(splitDir, false);
    await archive.finalize();

    archive.on("end", async () => {
      const files = await fs.readdir(splitDir);
      await Promise.all(files.map((f) => fs.unlink(path.join(splitDir, f))));
      await fs.rmdir(splitDir);
    });
  } catch (err) {
    console.error("splitPdf error:", err);
    return res.status(500).json({ error: "PDF parçalama başarısız." });
  }
}
