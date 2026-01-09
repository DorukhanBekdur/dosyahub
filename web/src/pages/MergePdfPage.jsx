import { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument } from "pdf-lib";
import InfoCard from "../components/features/InfoCard";
import {
  HiDownload,
  HiOutlineCloudUpload,
  HiTrash,
  HiDocumentText,
} from "react-icons/hi";

const CANONICAL = "https://www.dosyahub.com/merge-pdf";

export default function MergePdfPage() {
  const [files, setFiles] = useState([]);
  const [downUrl, setDownUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const isPdf = (f) =>
    f &&
    (f.type === "application/pdf" || f.name?.toLowerCase().endsWith(".pdf"));

  const addFiles = (filesLike) => {
    const picked = Array.from(filesLike || []);
    if (!picked.length) return;

    const validFiles = picked.filter((f) => {
      if (!isPdf(f)) {
        setError("Yalnızca PDF yükleyin.");
        return false;
      }
      if (f.size > 50 * 1024 * 1024) {
        setError("Maksimum dosya boyutu 50MB.");
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setError("");
      setDownUrl("");
      setFiles((prev) => [...prev, ...validFiles].slice(0, 2));
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.remove("border-indigo-500", "bg-white/[0.05]");
    addFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.add("border-indigo-500", "bg-white/[0.05]");
  }, []);

  const onDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("border-indigo-500", "bg-white/[0.05]");
  }, []);

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDownUrl("");
  };

  const mergeFilesLocally = async () => {
    if (files.length < 2)
      return setError("Lütfen birleştirmek için iki PDF seçin.");
    setLoading(true);
    setError("");
    setDownUrl("");

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);

        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();

      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setDownUrl(url);
    } catch (e) {
      console.error(e);
      setError("PDF işlenirken bir hata oluştu. Dosyalar bozuk olabilir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] py-12 px-6 lg:px-12 md:py-20">
      <Helmet>
        <title>PDF Birleştirme | DosyaHub</title>
        <meta
          name="description"
          content="PDF dosyalarını sunucuya yüklemeden tarayıcınızda güvenli şekilde birleştirin."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <section className="relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col group">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] bg-indigo-500/10 pointer-events-none" />

            <div className="relative z-10">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  PDF Birleştirme
                </h1>
                <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                  PDF dosyalarınızı sürükleyin ya da yükleyin ardından anında
                  birleştirin.
                </p>
              </header>

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
                  Dosyalarınızı buraya sürükleyin
                </p>
                <p className="text-zinc-500 text-sm mt-3 font-light">
                  Lütfen yükleyeceğiniz dosyanın 50 MB'dan küçük olduğundan emin
                  olun.
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => addFiles(e.target.files)}
                  className="hidden"
                />
              </div>

              {files.length > 0 && (
                <div className="mt-8 space-y-3">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 animate-in fade-in slide-in-from-bottom-2"
                    >
                      <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                        <HiDocumentText className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">
                          {f.name}
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          {(f.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                        className="p-2 text-zinc-600 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <HiTrash className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
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
                  onClick={mergeFilesLocally}
                  disabled={files.length !== 2 || loading}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all active:scale-[0.98] disabled:opacity-30 shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                  {loading ? "İşleniyor..." : "Dosyaları Birleştir"}
                </button>
                <button
                  onClick={() => {
                    setFiles([]);
                    setDownUrl("");
                    setError("");
                  }}
                  className="px-6 rounded-2xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Sıfırla
                </button>
              </div>

              {downUrl && !loading && (
                <div className="mt-6 p-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500">
                  <a
                    href={downUrl}
                    download="birlesmis-dosyahub.pdf"
                    className="flex items-center justify-center gap-3 rounded-[calc(1rem+4px)] px-6 py-4 bg-[#0f0a1e] text-emerald-400 font-bold hover:bg-transparent hover:text-white transition-all"
                  >
                    <HiDownload className="text-xl" /> Birleştirilmiş PDF'i
                    İndir
                  </a>
                </div>
              )}
            </div>
          </section>

          <InfoCard />
        </div>
      </div>
    </div>
  );
}
