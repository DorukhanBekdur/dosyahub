import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineCloudUpload, HiDownload } from "react-icons/hi";
import { HiArrowsUpDown } from "react-icons/hi2";
import * as pdfjs from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?worker&url";
import { PDFDocument } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function OrganizePdfCard() {
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
    dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
  }, []);
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.add("ring-2", "ring-indigo-500");
  }, []);
  const onDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
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

        if (total > 200) {
          setError("Maksimum 200 sayfa desteklenir.");
          return;
        }

        const out = [];
        for (let i = 1; i <= total; i++) {
          if (cancelled) break;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.35 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          await page.render({ canvasContext: context, viewport }).promise;
          const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
          out.push({ id: `${i}`, index: i - 1, thumbDataUrl: dataUrl });
        }
        if (!cancelled) setPages(out);
      } catch (e) {
        console.error(e);
        setError("PDF önizlemeleri oluşturulamadı.");
      } finally {
        try {
          await pdf?.destroy();
        } catch {}
        try {
          await loadingTask?.destroy();
        } catch {}
        setLoading(false);
      }
    };
    renderThumbs();
    return () => {
      cancelled = true;
    };
  }, [pdfBytes]);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (position) => {
    dragItem.current = position;
  };
  const handleDragEnter = (position) => {
    dragOverItem.current = position;
  };
  const handleDragEnd = () => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from == null || to == null || from === to) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }
    setPages((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr.map((p, idx) => ({ ...p, index: idx }));
    });
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const resetAll = () => {
    setFile(null);
    setPdfBytes(null);
    setPages([]);
    setError("");
    setDownloadUrl("");
    inputRef.current && (inputRef.current.value = "");
  };

  const buildPdf = async () => {
    if (!pdfBytes || pages.length === 0)
      return setError("Lütfen bir PDF yükleyin.");
    setBuilding(true);
    setError("");
    setDownloadUrl("");

    try {
      const srcDoc = await PDFDocument.load(pdfBytes);

      const outDoc = await PDFDocument.create();

      const orderedIndices = pages.map((p) => {
        const n = parseInt(p.id, 10);
        return Number.isNaN(n) ? p.index : n - 1;
      });

      const copiedPages = await outDoc.copyPages(srcDoc, orderedIndices);
      copiedPages.forEach((pg) => outDoc.addPage(pg));

      const newBytes = await outDoc.save();
      const url = URL.createObjectURL(
        new Blob([newBytes], { type: "application/pdf" })
      );
      setDownloadUrl(url);
    } catch (e) {
      console.error("PDF oluşturma hatası:", e);
      setError(
        "Yeni PDF oluşturulamadı. Bu dosya şifreli/bozuk olabilir veya desteklenmeyen bir sıkıştırma kullanıyor olabilir."
      );
    } finally {
      setBuilding(false);
    }
  };

  return (
    <section className="h-full min-h-[460px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg">
      <h1 className="text-3xl font-semibold tracking-tight">
        PDF Sayfalarını Sırala
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
        Küçük önizlemeleri sürükle-bırak ile yeniden düzenleyin, yeni sıralı
        PDF’i indirin.
      </p>

      {!file && (
        <div
          ref={dropRef}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className="relative mt-6 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-10 flex flex-col items-center justify-center text-center transition-all overflow-hidden
                     bg-gradient-to-b from-zinc-50/80 to-zinc-100/60 dark:from-zinc-800/40 dark:to-zinc-800/20"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full blur-3xl bg-indigo-500/30"></div>
            <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full blur-3xl bg-purple-500/20"></div>
          </div>

          <HiOutlineCloudUpload className="h-12 w-12 text-indigo-500 opacity-80 animate-[float_3s_ease-in-out_infinite]" />
          <p className="mt-4 text-sm">
            PDF’i bu alana sürükleyip bırakın
            <br />
            <span className="text-zinc-500">veya</span>
          </p>

          <input
            ref={inputRef}
            id="organize-input"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => e.target.files && onFiles(e.target.files)}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-controls="organize-input"
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white
                       bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-colors cursor-pointer"
          >
            PDF Yükle
          </button>

          <p className="mt-3 text-xs text-zinc-500">Yalnızca PDF • Maks 50MB</p>
          <style>{`@keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}`}</style>
        </div>
      )}

      {file && (
        <>
          <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Seçilen PDF</p>
                <p className="truncate font-medium">{file.name}</p>
                <p className="text-xs text-zinc-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={resetAll}
                className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs transition-colors cursor-pointer"
              >
                Değiştir
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-300/60 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm p-3">
              {error}
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <HiArrowsUpDown className="w-5 h-5" />
            <span>Sayfaları sürükleyip bırakın.</span>
          </div>

          <div
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
             rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/60 dark:bg-zinc-900/50"
          >
            {loading && pages.length === 0 && (
              <p className="col-span-full text-sm text-zinc-500">
                Önizlemeler hazırlanıyor…
              </p>
            )}

            {pages.map((p, idx) => (
              <div
                key={p.id ?? idx}
                className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden 
             cursor-grab active:cursor-grabbing hover:shadow-md transition"
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragEnter={() => handleDragEnter(idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                title={`Sayfa ${idx + 1}`}
              >
                <img
                  src={p.thumbDataUrl}
                  alt={`Sayfa ${idx + 1}`}
                  className="w-full h-auto block select-none pointer-events-none"
                />
                <div className="absolute top-2 left-2 text-[11px] px-2 py-0.5 rounded-md bg-black/60 text-white">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={buildPdf}
              disabled={pages.length === 0 || building}
              className="flex-1 rounded-xl px-4 py-2 text-white font-medium disabled:opacity-50 transition-all
                         bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                         hover:shadow-md active:scale-[0.99] cursor-pointer"
            >
              {building ? "Oluşturuluyor…" : "Yeni PDF’i İndir"}
            </button>

            {downloadUrl && !building && (
              <a
                href={downloadUrl}
                download={`${(file?.name || "organized").replace(
                  /\.pdf$/i,
                  ""
                )}-reordered.pdf`}
                className="px-4 py-2 rounded-xl border border-emerald-300 bg-emerald-600 text-white hover:bg-emerald-700 text-sm transition-colors inline-flex items-center gap-2"
              >
                <HiDownload className="text-lg" />
                İndir
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
}
