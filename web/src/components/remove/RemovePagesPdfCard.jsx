import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiOutlineCloudUpload,
  HiDownload,
  HiDocumentText,
  HiTrash,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import * as pdfjs from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?worker&url";
import { PDFDocument } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function RemovePagesPdfCard() {
  const [file, setFile] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const isPdf = (f) =>
    f &&
    (f.type === "application/pdf" || f.name?.toLowerCase().endsWith(".pdf"));

  const onFiles = async (filesLike) => {
    const f = Array.from(filesLike || [])[0];
    if (!f) return;
    if (!isPdf(f)) return setError("Yalnızca PDF yükleyin.");
    if (f.size > 50 * 1024 * 1024) return setError("Maksimum 50MB.");
    setError("");
    setDownloadUrl("");
    setPages([]);
    setFile(f);
    setLoading(true);
    try {
      const ab = await f.arrayBuffer();
      setPdfBytes(new Uint8Array(ab));
    } catch {
      setError("Dosya okunamadı.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onFiles(e.dataTransfer.files);
    dropRef.current?.classList.remove("border-indigo-500", "bg-indigo-500/5");
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.add("border-indigo-500", "bg-indigo-500/5");
  }, []);

  const onDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("border-indigo-500", "bg-indigo-500/5");
  }, []);

  useEffect(() => {
    let cancelled = false;
    const renderThumbs = async () => {
      if (!pdfBytes) return;
      setLoading(true);
      let loadingTask, pdf;
      try {
        loadingTask = pdfjs.getDocument({ data: new Uint8Array(pdfBytes) });
        pdf = await loadingTask.promise;
        const total = pdf.numPages;
        if (total > 300) {
          setError("Maksimum 300 sayfa desteklenir.");
          return;
        }
        const out = [];
        for (let i = 1; i <= total; i++) {
          if (cancelled) break;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.35 });
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          out.push({
            id: `${i}`,
            index: i - 1,
            thumbDataUrl: canvas.toDataURL("image/jpeg", 0.6),
            selected: false,
          });
        }
        if (!cancelled) setPages(out);
      } catch (e) {
        setError("PDF önizlemeleri oluşturulamadı.");
      } finally {
        pdf?.destroy();
        setLoading(false);
      }
    };
    renderThumbs();
    return () => {
      cancelled = true;
    };
  }, [pdfBytes]);

  const toggleSelect = (idx) => {
    setPages((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], selected: !next[idx].selected };
      return next;
    });
  };

  const resetAll = () => {
    setFile(null);
    setPdfBytes(null);
    setPages([]);
    setError("");
    setDownloadUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const buildPdf = async () => {
    if (!pdfBytes || pages.length === 0) return;
    const keepIndices = pages.filter((p) => !p.selected).map((p) => p.index);
    if (keepIndices.length === 0)
      return setError("En az bir sayfa bırakmalısınız.");

    setBuilding(true);
    setError("");
    try {
      const srcDoc = await PDFDocument.load(pdfBytes);
      const outDoc = await PDFDocument.create();
      const copied = await outDoc.copyPages(srcDoc, keepIndices);
      copied.forEach((pg) => outDoc.addPage(pg));
      const newBytes = await outDoc.save();
      setDownloadUrl(
        URL.createObjectURL(new Blob([newBytes], { type: "application/pdf" }))
      );
    } catch (e) {
      setError("Yeni PDF oluşturulamadı.");
    } finally {
      setBuilding(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200 dark:border-white/10 p-8 md:p-10 shadow-2xl flex flex-col min-h-[550px] transition-all">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <header className="mb-8 relative z-10 text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
          PDF Sayfa Silme
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm leading-relaxed">
          Silmek istediğiniz sayfaları tıklayarak işaretleyin, ardından dökümanı
          sadeleştirin.
        </p>
      </header>

      {!file ? (
        <div
          ref={dropRef}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
          className="group relative rounded-[2.5rem] border-2 border-dashed border-zinc-300 dark:border-white/10 p-16 flex flex-col items-center justify-center text-center transition-all hover:bg-zinc-50 dark:hover:bg-white/[0.03] cursor-pointer"
        >
          <div className="p-5 rounded-full bg-indigo-500/10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300">
            <HiOutlineCloudUpload className="h-10 w-10" />
          </div>
          <p className="font-medium text-lg dark:text-white">
            PDF Yükle veya Sürükle
          </p>
          <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-bold">
            Maksimum 50MB
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
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Seçili Dosya Bilgisi */}
          <div className="flex items-center gap-4 p-5 rounded-3xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 text-left">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
              <HiDocumentText className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate dark:text-white">
                {file.name}
              </p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                {pages.length} SAYFA • {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={resetAll}
              className="p-2 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Dosyayı Değiştir"
            >
              <HiTrash className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Sayfa Önizleme Alanı */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar p-1">
            {loading && pages.length === 0 && (
              <p className="col-span-full text-center py-12 text-zinc-500 animate-pulse text-sm font-medium">
                Sayfalar taranıyor...
              </p>
            )}

            {pages.map((p, idx) => (
              <button
                key={p.id ?? idx}
                onClick={() => toggleSelect(idx)}
                className={`group relative rounded-2xl border-2 transition-all duration-300 overflow-hidden outline-none shadow-sm ${
                  p.selected
                    ? "border-rose-500 ring-4 ring-rose-500/10 scale-[0.98]"
                    : "border-zinc-200 dark:border-white/5 hover:border-indigo-500/50"
                }`}
              >
                <img
                  src={p.thumbDataUrl}
                  alt=""
                  className={`w-full h-auto transition-all duration-500 ${
                    p.selected
                      ? "grayscale opacity-25 scale-110"
                      : "group-hover:scale-105"
                  }`}
                />
                <div className="absolute top-2 right-2">
                  {p.selected ? (
                    <HiXCircle className="w-8 h-8 text-rose-500 bg-white rounded-full shadow-lg" />
                  ) : (
                    <HiCheckCircle className="w-8 h-8 text-emerald-500/40 group-hover:text-emerald-500 transition-colors" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md py-1.5 text-[10px] font-black text-white text-center uppercase tracking-tighter">
                  SAYFA {idx + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Alt Aksiyon Butonları */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={buildPdf}
              disabled={
                building || pages.length === 0 || pages.every((p) => p.selected)
              }
              className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-30 shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <HiTrash className="text-xl" />
              {building ? "Düzenleniyor..." : "Seçilenleri Sil & Hazırla"}
            </button>

            {downloadUrl && !building && (
              <a
                href={downloadUrl}
                download={`${file?.name.replace(/\.pdf$/i, "")}-dosyahub.pdf`}
                className="flex-1 py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 animate-in zoom-in-95"
              >
                <HiDownload className="text-xl" /> İndir
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
