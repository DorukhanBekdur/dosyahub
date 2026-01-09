import { useEffect, useRef, useState } from "react";
import {
  HiOutlineCloudUpload,
  HiDocumentText,
  HiTrash,
  HiDownload,
  HiSparkles,
} from "react-icons/hi";
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

  const inputRef = useRef(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const onFiles = async (filesLike) => {
    const f = Array.from(filesLike || [])[0];
    if (!f || f.type !== "application/pdf")
      return setError("Yalnızca PDF yükleyin.");
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
    const render = async () => {
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
            thumbDataUrl: canvas.toDataURL("image/jpeg", 0.6),
          });
        }
        if (!cancelled) setPages(out);
      } catch {
        setError("Önizleme hatası.");
      }
      setLoading(false);
    };
    render();
    return () => {
      cancelled = true;
    };
  }, [pdfBytes]);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const _pages = [...pages];
    const draggedItemContent = _pages.splice(dragItem.current, 1)[0];
    _pages.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = dragOverItem.current;
    setPages(_pages);
  };

  const buildPdf = async () => {
    if (!pdfBytes || pages.length === 0) return;
    setBuilding(true);
    try {
      const srcDoc = await PDFDocument.load(pdfBytes);
      const outDoc = await PDFDocument.create();
      const indices = pages.map((p) => parseInt(p.id) - 1);
      const copied = await outDoc.copyPages(srcDoc, indices);
      copied.forEach((pg) => outDoc.addPage(pg));
      const res = await outDoc.save();
      setDownloadUrl(
        URL.createObjectURL(new Blob([res], { type: "application/pdf" }))
      );
    } catch {
      setError("Hata oluştu.");
    }
    setBuilding(false);
  };

  return (
    <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl transition-all">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] bg-indigo-500/10 pointer-events-none" />

      <div className="relative z-10 text-left">
        <header className="mb-8 text-white text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            PDF Sıralama
          </h1>
          <p className="text-zinc-400 mt-3 text-sm">
            PDF sayfalarınızı sürükleyip bırakarak dilediğiniz sıraya dizin ve
            kaydedin
          </p>
        </header>

        {!file ? (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onFiles(e.dataTransfer.files);
            }}
            className="group/drop rounded-[2.5rem] border-2 border-dashed border-white/10 p-12 min-h-[280px] flex flex-col items-center justify-center transition-all bg-white/[0.01] hover:bg-white/[0.04] hover:border-indigo-500/50 cursor-pointer"
          >
            <div className="p-5 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 group-hover/drop:scale-110 transition-transform">
              <HiOutlineCloudUpload className="h-12 w-12" />
            </div>
            <p className="text-lg text-white font-medium text-center">
              PDF dosyalarınızı buraya sürükleyin
            </p>
            <p className="text-zinc-500 text-xs mt-2 tracking-wide uppercase font-bold">
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
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl">
                <HiDocumentText />
              </div>
              <div className="flex-1 truncate text-sm font-medium">
                {file.name}
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-2 text-zinc-500 hover:text-rose-500 transition-colors cursor-pointer"
              >
                <HiTrash className="text-xl" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 bg-black/20 p-4 rounded-[2rem] border border-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  draggable
                  onDragStart={(e) => {
                    dragItem.current = index;
                    e.currentTarget.style.opacity = "0.4";
                  }}
                  onDragEnd={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onDragEnter={() => {
                    dragOverItem.current = index;
                    handleSort();
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="group relative cursor-move rounded-xl border border-white/10 overflow-hidden bg-zinc-900 transition-all duration-300 active:scale-95 active:rotate-2 shadow-lg hover:border-indigo-500/50"
                >
                  <img
                    src={page.thumbDataUrl}
                    className="w-full aspect-[3/4] object-cover pointer-events-none"
                    alt=""
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-sm py-1.5 text-[10px] text-center text-white font-bold uppercase tracking-tighter">
                    {index + 1}. Sayfa
                  </div>
                  <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="p-2 rounded-lg bg-indigo-600 shadow-xl scale-75 group-hover:scale-100 transition-transform">
                      <HiArrowsUpDown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={buildPdf}
                disabled={loading || building}
                className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20 disabled:opacity-30 cursor-pointer"
              >
                {building ? "İşleniyor..." : "Sıralamayı Kaydet"}
              </button>
              <button
                onClick={() => setFile(null)}
                className="flex-1 py-4 rounded-2xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                Sıfırla
              </button>
            </div>

            {downloadUrl && (
              <div className="p-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 animate-in zoom-in-95">
                <a
                  href={downloadUrl}
                  download="sirali-dosyahub.pdf"
                  className="flex items-center justify-center gap-3 rounded-[calc(1rem+4px)] py-4 bg-[#0f0a1e] text-emerald-400 font-bold transition-all hover:bg-transparent hover:text-white cursor-pointer"
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
