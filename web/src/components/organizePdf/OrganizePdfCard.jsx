import { useCallback, useEffect, useRef, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import * as pdfjs from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?worker&url";
import { PDFDocument } from "pdf-lib";

import DropZone from "./DropZone";
import FileInfo from "./FileInfo";
import ThumbnailsGrid from "./ThumbnailsGrid";
import DownloadBar from "./DownloadBar";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
if (pdfjs.LogManager) pdfjs.LogManager.setLevel("error");

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
          const ctx = canvas.getContext("2d");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
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
  const handleDragStart = (position, e) => {
    dragItem.current = position;
  };
  const handleDragEnter = (position) => {
    dragOverItem.current = position;
  };
  const handleDragEnd = () => {
    const from = dragItem.current,
      to = dragOverItem.current;
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
      const ordered = pages.map((p) => {
        const n = parseInt(p.id, 10);
        return Number.isNaN(n) ? p.index : n - 1;
      });
      const copied = await outDoc.copyPages(srcDoc, ordered);
      copied.forEach((pg) => outDoc.addPage(pg));
      const newBytes = await outDoc.save();
      const url = URL.createObjectURL(
        new Blob([newBytes], { type: "application/pdf" })
      );
      setDownloadUrl(url);
    } catch (e) {
      console.error("PDF oluşturma hatası:", e);
      setError("Yeni PDF oluşturulamadı. Dosya şifreli/bozuk olabilir.");
    } finally {
      setBuilding(false);
    }
  };

  return (
    <section className="h-full min-h-[460px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg">
      <h1 className="text-3xl font-semibold tracking-tight">PDF Sıralama</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
        Küçük önizlemeleri <strong>sürükle-bırak</strong> ile yeniden
        düzenleyin, yeni oluşan <strong>sıralı</strong> PDF’i indirin.
      </p>

      {!file && (
        <DropZone
          dropRef={dropRef}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          inputRef={inputRef}
          onPick={(e) => e.target.files && onFiles(e.target.files)}
        />
      )}

      {file && (
        <>
          <FileInfo file={file} onReset={resetAll} />

          {error && (
            <div className="mt-4 rounded-lg border border-red-300/60 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm p-3">
              {error}
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <HiArrowsUpDown className="w-5 h-5" />
            <span>Sayfaları sürükleyip bırakın.</span>
          </div>

          <ThumbnailsGrid
            pages={pages}
            loading={loading}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />

          <DownloadBar
            canBuild={pages.length > 0}
            building={building}
            onBuild={buildPdf}
            downloadUrl={downloadUrl}
            downloadName={`${(file?.name || "organized").replace(
              /\.pdf$/i,
              ""
            )}-reordered.pdf`}
          />
        </>
      )}
    </section>
  );
}
