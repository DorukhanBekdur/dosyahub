import { useCallback, useRef, useState } from "react";
import { HiOutlineCloudUpload, HiDownload } from "react-icons/hi";

const API = import.meta.env.VITE_API_URL;

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

  const handleSplit = async () => {
    if (!file) return setError("Lütfen bir PDF seçin.");
    setLoading(true);
    setError("");
    setDownloadUrl("");
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${API}/api/split/pdf`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Parçalama başarısız.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (e) {
      setError(e.message || "Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setDownloadUrl("");
    setError("");
    inputRef.current && (inputRef.current.value = "");
  };

  return (
    <section className="h-full min-h-[460px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg">
      <h1 className="text-3xl font-semibold tracking-tight">PDF’i Parçala</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
        PDF dosyasını yükleyin, tüm sayfalar ZIP içinde ayrı PDF’ler olarak
        indirilir.
      </p>

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
          id="split-input"
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => e.target.files && onFiles(e.target.files)}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-controls="split-input"
          className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white
                     bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-colors cursor-pointer"
        >
          PDF Yükle
        </button>

        <p className="mt-3 text-xs text-zinc-500">Yalnızca PDF • Maks 50MB</p>
        <style>{`@keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}`}</style>
      </div>

      {file && (
        <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70">
          <p className="text-xs text-zinc-500 mb-1">Seçilen PDF</p>
          <p className="truncate font-medium">{file.name}</p>
          <p className="text-xs text-zinc-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg border border-red-300/60 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm p-3">
          {error}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSplit}
          disabled={!file || loading}
          className="flex-1 rounded-xl px-4 py-2 text-white font-medium disabled:opacity-50 transition-all
                     bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                     hover:shadow-md active:scale-[0.99] cursor-pointer"
        >
          {loading ? "Parçalanıyor…" : "PDF’i Parçala"}
        </button>
        <button
          onClick={resetAll}
          disabled={loading && !downloadUrl}
          className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm transition-colors cursor-pointer"
        >
          Sıfırla
        </button>
      </div>

      {downloadUrl && !loading && (
        <div className="mt-6 rounded-xl border border-emerald-300/60 bg-emerald-50 dark:bg-emerald-900/20 p-4">
          <p className="text-sm text-emerald-800 dark:text-emerald-200">
            Parçalama tamam! ZIP’i indirebilirsin.
          </p>
          <a
            href={downloadUrl}
            download="split-pages.zip"
            className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            <HiDownload className="text-lg" />
            ZIP’i indir
          </a>
        </div>
      )}
    </section>
  );
}
