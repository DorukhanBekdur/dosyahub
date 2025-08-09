import path from "path";
import { OUTPUT_DIR } from "../libs/paths.js";

export async function downloadById(req, res) {
  const file = path.join(OUTPUT_DIR, req.params.fileId);
  return res.download(file, req.params.fileId);
}
