import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineCloudUpload, HiDownload } from "react-icons/hi";
import { HiArrowPathRoundedSquare, HiCheckCircle } from "react-icons/hi2";
import * as pdfjs from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?worker&url";
import { PDFDocument, degrees } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function RotatePdfCard() {
  const [file, setFile] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const [angle, setAngle] = useState(90); // 90 | 180 | 270

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
        if (total > 50) {
          setError("Maksimum 50 sayfa desteklenir.");
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
          const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
          out.push({
            id: `${i}`,
            index: i - 1,
            thumbDataUrl: dataUrl,
            selected: false,
          });
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
    inputRef.current && (inputRef.current.value = "");
  };

  const buildPdf = async () => {
    if (!pdfBytes || pages.length === 0)
      return setError("Lütfen bir PDF yükleyin.");

    const targetIndexes = pages.filter((p) => p.selected).map((p) => p.index);
    if (targetIndexes.length === 0)
      return setError("Döndürülecek en az bir sayfa seçin.");

    setBuilding(true);
    setError("");
    setDownloadUrl("");
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      for (const i of targetIndexes) {
        const page = pdfDoc.getPage(i);
        page.setRotation(degrees(angle));
      }
      const newBytes = await pdfDoc.save({ useObjectStreams: false });
      const url = URL.createObjectURL(
        new Blob([newBytes], { type: "application/pdf" })
      );
      setDownloadUrl(url);
    } catch (e) {
      console.error("Rotate error:", e);
      setError("Yeni PDF oluşturulamadı. Dosya şifreli ya da bozuk olabilir.");
    } finally {
      setBuilding(false);
    }
  };

  return (
    <section className="h-full min-h-[460px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg">
      <h1 className="text-3xl font-semibold tracking-tight">PDF Döndürme</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
        PDF’i yükleyin; <strong>90° / 180° / 270°</strong> ile{" "}
        <strong>seçtiğiniz sayfaları</strong> döndürün.
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
            id="rotate-input"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => e.target.files && onFiles(e.target.files)}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-controls="rotate-input"
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
          {/* Seçilen dosya + Ayarlar */}
          <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
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

            <div className="mt-5">
              <p className="text-xs text-center text-zinc-500 mb-2">Açı</p>
              <div className="w-full flex justify-center">
                <div className="inline-flex rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden">
                  {[90, 180, 270].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAngle(opt)}
                      className={`px-4 py-2 text-sm transition-colors cursor-pointer
                        ${
                          angle === opt
                            ? "bg-indigo-600 text-white"
                            : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }
                        ${
                          opt !== 270
                            ? "border-r border-zinc-300 dark:border-zinc-700"
                            : ""
                        }
                      `}
                    >
                      {opt}°
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-300/60 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm p-3">
              {error}
            </div>
          )}

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
              <button
                key={p.id ?? idx}
                type="button"
                onClick={() => toggleSelect(idx)}
                className={`relative text-left rounded-lg border shadow-sm overflow-hidden transition cursor-pointer
                  ${
                    p.selected
                      ? "border-indigo-400 ring-2 ring-indigo-300/60"
                      : "border-zinc-200 dark:border-zinc-800 hover:shadow-md"
                  }`}
                aria-pressed={p.selected}
              >
                <img
                  src={p.thumbDataUrl}
                  alt={`Sayfa ${idx + 1}`}
                  className="w-full h-auto block select-none pointer-events-none"
                />
                <div className="absolute top-2 right-2">
                  {p.selected ? (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-indigo-600 text-white">
                      <HiCheckCircle className="w-4 h-4" />
                      Seçildi
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-zinc-800/80 text-white">
                      {idx + 1}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={buildPdf}
              disabled={building || pages.every((p) => !p.selected)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-white font-medium disabled:opacity-50 transition-all
                         bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-md active:scale-[0.99] cursor-pointer"
            >
              <HiArrowPathRoundedSquare className="text-lg" />
              {building ? "Oluşturuluyor…" : "Döndür & Yeni PDF’i İndir"}
            </button>

            {downloadUrl && !building && (
              <a
                href={downloadUrl}
                download={`${(file?.name || "rotated").replace(
                  /\.pdf$/i,
                  ""
                )}-rotated.pdf`}
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
