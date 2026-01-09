import { useCallback, useRef, useState } from "react";
import {
  HiOutlineCloudUpload,
  HiDownload,
  HiDocumentText,
  HiTrash,
  HiScissors,
} from "react-icons/hi";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export default function SplitPdfCard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const isPdf = (f) =>
    f &&
    (f.type === "application/pdf" || f.name?.toLowerCase().endsWith(".pdf"));

  const onFiles = (filesLike) => {
    const f = Array.from(filesLike || [])[0];
    if (!f) return;
    if (!isPdf(f)) return setError("Yalnızca PDF yükleyin.");
    if (f.size > 50 * 1024 * 1024) return setError("Maksimum 50MB.");
    setError("");
    setDownloadUrl("");
    setFile(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.remove("border-indigo-500", "bg-white/[0.05]");
    onFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.add("border-indigo-500", "bg-white/[0.05]");
  }, []);

  const onDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("border-indigo-500", "bg-white/[0.05]");
  }, []);

  const handleSplit = async () => {
    if (!file) return setError("Lütfen bir PDF seçin.");
    setLoading(true);
    setError("");
    setDownloadUrl("");

    try {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      const pageCount = pdfDoc.getPageCount();

      const zip = new JSZip();
      const folder = zip.folder(`${file.name.replace(".pdf", "")}_sayfalari`);

      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
        const pdfBytes = await newPdf.save();
        folder.file(`sayfa_${i + 1}.pdf`, pdfBytes);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      setDownloadUrl(url);
    } catch (e) {
      console.error(e);
      setError(
        "PDF parçalanırken bir hata oluştu. Dosya şifreli veya bozuk olabilir."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setDownloadUrl("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col group">
      <div className="relative z-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            PDF Parçalama
          </h1>
          <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
            Her sayfayı ayrı bir PDF'e dönüştürün ve ZIP formatında topluca
            indirin.
          </p>
        </header>

        {!file ? (
          <div
            ref={dropRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => inputRef.current?.click()}
            className="group/drop relative rounded-[2.5rem] border-2 border-dashed border-white/10 p-12 min-h-[280px] flex flex-col items-center justify-center text-center transition-all bg-white/[0.01] hover:bg-white/[0.04] hover:border-indigo-500/50 cursor-pointer"
          >
            <div className="p-5 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 transition-transform duration-500 group-hover/drop:scale-110">
              <HiOutlineCloudUpload className="h-12 w-12" />
            </div>
            <p className="text-white font-medium text-lg">
              PDF dosyasını buraya sürükleyin
            </p>
            <p className="text-zinc-500 text-xs mt-2">
              veya seçmek için tıklayın
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => onFiles(e.target.files)}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/10 animate-in fade-in zoom-in-95">
            <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
              <HiDocumentText className="h-8 w-8" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-semibold truncate">
                {file.name}
              </p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={resetAll}
              className="p-3 text-zinc-600 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <HiTrash className="h-6 w-6" />
            </button>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            {error}
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="flex gap-4">
          <button
            onClick={handleSplit}
            disabled={!file || loading}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            {loading ? "Sayfalar Ayrılıyor..." : "PDF'i Parçala"}
          </button>
          <button
            onClick={resetAll}
            className="px-6 rounded-2xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            Sıfırla
          </button>
        </div>

        {downloadUrl && !loading && (
          <div className="mt-6 p-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500">
            <a
              href={downloadUrl}
              download={`${file.name.replace(".pdf", "")}_dosyahub_zip.zip`}
              className="flex items-center justify-center gap-3 rounded-[calc(1.5rem-4px)] px-6 py-4 bg-[#0f0a1e] text-emerald-400 font-bold hover:bg-transparent hover:text-white transition-all cursor-pointer"
            >
              <HiDownload className="text-xl" /> Parçalanmış PDF'leri İndir
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
