import { Router } from "express";
import { uploadPdf } from "../libs/multer.js";
import { mergeTwoPdfs } from "../controllers/pdf.merge.controller.js";
import { splitPdf } from "../controllers/pdf.split.controller.js";
import { downloadById } from "../controllers/pdf.download.controller.js";

const router = Router();

router.get("/health", (req, res) => res.json({ ok: true }));

const uploadTwo = uploadPdf.fields([
  { name: "file1", maxCount: 1 },
  { name: "file2", maxCount: 1 },
]);
router.post("/merge/pdf", uploadTwo, mergeTwoPdfs);

router.post("/split/pdf", uploadPdf.single("file"), splitPdf);

router.get("/download/:fileId", downloadById);

export default router;
