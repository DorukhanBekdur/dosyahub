import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiOutlineCloudUpload,
  HiDownload,
  HiDocumentText,
  HiTrash,
  HiXCircle,
  HiCheckCircle,
  HiSparkles,
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
            selected: false,
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
    const keepIndices = pages.filter((p) => !p.selected).map((p) => p.index);
    if (keepIndices.length === 0)
      return setError("En az bir sayfa bırakmalısınız.");

    setBuilding(true);
    try {
      const srcDoc = await PDFDocument.load(pdfBytes);
      const outDoc = await PDFDocument.create();
      const copied = await outDoc.copyPages(srcDoc, keepIndices);
      copied.forEach((pg) => outDoc.addPage(pg));
      const newBytes = await outDoc.save();
      setDownloadUrl(
        URL.createObjectURL(new Blob([newBytes], { type: "application/pdf" }))
      );
    } catch {
      setError("PDF oluşturulamadı.");
    }
    setBuilding(false);
  };

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col group transition-all text-left">
      <div className="relative z-10 text-white">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            PDF Sayfa Silme
          </h1>
          <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
            Silmek istediğiniz sayfaların üzerine tıklayın ve dökümanı
            sadeleştirin.
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
            <p className="text-xl font-semibold">PDF'i buraya sürükleyin</p>
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
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                <HiDocumentText className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                  {pages.length} SAYFA • {(file.size / 1024 / 1024).toFixed(2)}{" "}
                  MB
                </p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-2 text-zinc-600 hover:text-rose-500 transition-colors cursor-pointer"
              >
                <HiTrash className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar p-1 bg-black/20 rounded-[2rem] border border-white/5">
              {loading && pages.length === 0 && (
                <p className="col-span-full text-center py-20 text-zinc-500 animate-pulse text-sm">
                  Sayfalar hazırlanıyor...
                </p>
              )}

              {pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => toggleSelect(idx)}
                  className={`group relative rounded-2xl border-2 transition-all duration-300 overflow-hidden outline-none ${
                    p.selected
                      ? "border-rose-500 ring-4 ring-rose-500/10 scale-95"
                      : "border-white/5 hover:border-indigo-500/50"
                  }`}
                >
                  <img
                    src={p.thumbDataUrl}
                    alt=""
                    className={`w-full h-auto transition-all duration-500 ${
                      p.selected
                        ? "grayscale opacity-30 scale-110"
                        : "group-hover:scale-110"
                    }`}
                  />
                  <div className="absolute top-2 right-2">
                    {p.selected ? (
                      <HiXCircle className="w-8 h-8 text-rose-500 bg-white rounded-full shadow-lg animate-in zoom-in" />
                    ) : (
                      <HiCheckCircle className="w-8 h-8 text-emerald-500/20 group-hover:text-emerald-500 transition-colors" />
                    )}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md py-1.5 text-[10px] font-black text-white text-center uppercase tracking-tighter">
                    SAYFA {idx + 1}
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={buildPdf}
                disabled={
                  building ||
                  pages.length === 0 ||
                  pages.every((p) => p.selected)
                }
                className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-30 shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
              >
                {building ? "İşleniyor..." : "Seçilenleri Sil & Kaydet"}
              </button>
              <button
                onClick={() => setFile(null)}
                className="flex-1 py-4 rounded-2xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Sıfırla
              </button>
            </div>

            {downloadUrl && !building && (
              <div className="p-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 animate-in zoom-in-95">
                <a
                  href={downloadUrl}
                  download="silinmis-dosyahub.pdf"
                  className="flex items-center justify-center gap-3 rounded-[calc(1rem+4px)] px-6 py-4 bg-[#0f0a1e] text-emerald-400 font-bold hover:bg-transparent hover:text-white transition-all"
                >
                  <HiDownload className="text-xl" /> İşlem Tamam! İndir
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
