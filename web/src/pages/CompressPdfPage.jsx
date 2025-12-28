import { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument } from "pdf-lib";
import InfoCard from "../components/features/InfoCard";
import {
  HiDownload,
  HiOutlineCloudUpload,
  HiDocumentText,
  HiTrash,
  HiLightningBolt,
} from "react-icons/hi";

const CANONICAL = "https://www.dosyahub.com/compress-pdf";

export default function CompressPdfPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downUrl, setDownUrl] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const isPdf = (f) =>
    f &&
    (f.type === "application/pdf" || f.name?.toLowerCase().endsWith(".pdf"));

  const pickFile = (filesLike) => {
    const picked = Array.from(filesLike || [])[0];
    if (!picked) return;
    if (!isPdf(picked)) return setError("Yalnızca PDF yükleyin.");
    if (picked.size > 100 * 1024 * 1024)
      return setError("PDF en fazla 100MB olabilir.");

    setError("");
    setDownUrl("");
    setStats(null);
    setFile(picked);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.remove("border-indigo-500", "bg-white/[0.05]");
    pickFile(e.dataTransfer.files);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.add("border-indigo-500", "bg-white/[0.05]");
  }, []);

  const onDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("border-indigo-500", "bg-white/[0.05]");
  }, []);

  const handleCompress = async () => {
    if (!file) return setError("Lütfen bir PDF seçin.");
    setLoading(true);
    setError("");

    try {
      const fileBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);

      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const blob = new Blob([compressedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setDownUrl(url);
      setStats({
        before: file.size,
        after: blob.size,
        ratio: Math.max(
          0,
          Math.round(((file.size - blob.size) / file.size) * 100)
        ),
      });
    } catch (e) {
      setError("PDF optimize edilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] py-12 px-6 lg:px-12 md:py-20">
      <Helmet>
        <title>PDF Sıkıştırma | DosyaHub</title>
        <meta
          name="description"
          content="PDF dosyalarınızı sunucuya yüklemeden tarayıcınızda optimize edin ve boyutunu küçültün."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <section className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col group">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] bg-indigo-500/10 pointer-events-none" />

            <header className="mb-8 relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                PDF Sıkıştırma
              </h1>
              <p className="text-zinc-400 mt-3 text-sm">
                Dosya boyutunu kaliteyi bozmadan optimize edin.
              </p>
            </header>

            {!file ? (
              <div
                ref={dropRef}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => inputRef.current?.click()}
                className="group/drop relative rounded-[2.5rem] border-2 border-dashed border-white/10 p-16 min-h-[300px] flex flex-col items-center justify-center text-center transition-all bg-white/[0.01] hover:bg-white/[0.04] hover:border-indigo-500/50 cursor-pointer"
              >
                <div className="p-6 rounded-3xl bg-indigo-500/10 text-indigo-400 mb-6 transition-transform duration-500 group-hover/drop:scale-110">
                  <HiOutlineCloudUpload className="h-14 w-14" />
                </div>
                <p className="text-xl text-white font-semibold">
                  PDF'i buraya bırakın
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => pickFile(e.target.files)}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/10">
                  <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    <HiDocumentText className="h-8 w-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-3 text-zinc-600 hover:text-rose-500 transition-colors"
                  >
                    <HiTrash className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <div className="mt-10 flex gap-4">
              <button
                onClick={handleCompress}
                disabled={!file || loading}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all active:scale-[0.98] disabled:opacity-30 shadow-lg shadow-indigo-500/20"
              >
                {loading ? "Optimize Ediliyor..." : "PDF'i Sıkıştır"}
              </button>
            </div>

            {downUrl && stats && (
              <div className="mt-6 p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 animate-in zoom-in-95">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                      Başarılı!
                    </p>
                    <p className="text-white text-lg font-bold">
                      Yeni Boyut: {(stats.after / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-500 text-2xl font-black">
                      -%{stats.ratio}
                    </p>
                  </div>
                </div>
                <a
                  href={downUrl}
                  download={`optimized-${file.name}`}
                  className="w-full flex items-center justify-center gap-3 rounded-2xl px-6 py-4 bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <HiDownload className="text-xl" /> PDF'i İndir
                </a>
              </div>
            )}
          </div>

          <InfoCard />
        </section>
      </div>
    </div>
  );
}
