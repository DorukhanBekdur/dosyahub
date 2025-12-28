import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiOutlineCloudUpload,
  HiDownload,
  HiDocumentText,
  HiTrash,
  HiSparkles,
  HiCheckCircle,
} from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
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
  const [angle, setAngle] = useState(90);

  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const onFiles = async (filesLike) => {
    const f = Array.from(filesLike || [])[0];
    if (!f || f.type !== "application/pdf")
      return setError("Yalnızca PDF yükleyin.");
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
    }
    setLoading(false);
  };

  useEffect(() => {
    let cancelled = false;
    const renderThumbs = async () => {
      if (!pdfBytes) return;
      setLoading(true);
      try {
        const pdf = await pdfjs.getDocument({ data: new Uint8Array(pdfBytes) })
          .promise;
        const out = [];
        for (let i = 1; i <= pdf.numPages; i++) {
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
            selected: true,
          });
        }
        if (!cancelled) setPages(out);
      } catch {
        setError("Önizlemeler oluşturulamadı.");
      }
      setLoading(false);
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

  const buildPdf = async () => {
    if (!pdfBytes || pages.length === 0) return;
    const targets = pages.filter((p) => p.selected).map((p) => p.index);
    if (targets.length === 0) return setError("Döndürülecek sayfa seçin.");

    setBuilding(true);
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      targets.forEach((idx) => {
        const p = pdfDoc.getPage(idx);
        const currentRotation = p.getRotation().angle;
        p.setRotation(degrees(currentRotation + angle));
      });
      const res = await pdfDoc.save();
      setDownloadUrl(
        URL.createObjectURL(new Blob([res], { type: "application/pdf" }))
      );
    } catch {
      setError("PDF oluşturulamadı.");
    }
    setBuilding(false);
  };

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col group transition-all text-left">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] bg-indigo-500/10 pointer-events-none" />

      <div className="relative z-10 text-white">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            PDF Döndürme
          </h1>
          <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
            Döndürmek istediğiniz sayfaları seçin ve açıyı belirleyin.
          </p>
        </header>

        {!file ? (
          <div
            ref={dropRef}
            onDragOver={(e) => {
              e.preventDefault();
              dropRef.current?.classList.add(
                "border-indigo-500",
                "bg-white/[0.05]"
              );
            }}
            onDragLeave={() => {
              dropRef.current?.classList.remove(
                "border-indigo-500",
                "bg-white/[0.05]"
              );
            }}
            onDrop={(e) => {
              e.preventDefault();
              onFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className="group/drop relative rounded-[2.5rem] border-2 border-dashed border-white/10 p-16 min-h-[300px] flex flex-col items-center justify-center text-center transition-all bg-white/[0.01] hover:bg-white/[0.04] hover:border-indigo-500/50 cursor-pointer"
          >
            <div className="p-6 rounded-3xl bg-indigo-500/10 text-indigo-400 mb-6 group-hover/drop:scale-110 transition-transform duration-500">
              <HiOutlineCloudUpload className="h-14 w-14" />
            </div>
            <p className="text-xl font-semibold">PDF'i buraya bırakın</p>
            <p className="text-zinc-500 text-sm mt-3 uppercase tracking-widest font-bold">
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
            {/* Dosya ve Açı Ayarları */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                  <HiDocumentText className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <button
                    onClick={() => setFile(null)}
                    className="text-[10px] text-rose-500 font-bold uppercase hover:underline"
                  >
                    Değiştir
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-around p-2 rounded-2xl bg-black/40 border border-white/5">
                {[90, 180, 270].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAngle(opt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      angle === opt
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {opt}°
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar p-1 bg-black/20 rounded-[2rem] border border-white/5">
              {pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => toggleSelect(idx)}
                  className={`group relative rounded-2xl border-2 transition-all duration-500 overflow-hidden outline-none ${
                    p.selected
                      ? "border-indigo-500 ring-4 ring-indigo-500/10"
                      : "border-white/5 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={p.thumbDataUrl}
                    style={{
                      transform: p.selected ? `rotate(${angle}deg)` : "none",
                    }}
                    className="w-full h-auto transition-transform duration-500"
                    alt=""
                  />
                  <div className="absolute top-2 right-2">
                    {p.selected ? (
                      <HiCheckCircle className="w-7 h-7 text-indigo-500 bg-white rounded-full shadow-lg" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-white/20 bg-black/40" />
                    )}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm py-1 text-[10px] font-bold text-center">
                    SAYFA {idx + 1}
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={buildPdf}
                disabled={building || pages.every((p) => !p.selected)}
                className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-30 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <HiArrowPathRoundedSquare className="text-xl" />
                {building ? "Döndürülüyor..." : "Seçilenleri Döndür"}
              </button>
              <button
                onClick={() => setFile(null)}
                className="flex-1 py-4 rounded-2xl border border-white/10 text-zinc-400 hover:bg-white/5 transition-all"
              >
                Sıfırla
              </button>
            </div>

            {downloadUrl && (
              <div className="p-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 animate-in zoom-in-95">
                <a
                  href={downloadUrl}
                  download="dondurulmus-dosyahub.pdf"
                  className="flex items-center justify-center gap-3 rounded-[calc(1rem+4px)] py-4 bg-[#0f0a1e] text-emerald-400 font-bold hover:bg-transparent hover:text-white transition-all"
                >
                  <HiDownload className="text-xl" /> Dosyayı İndir
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
