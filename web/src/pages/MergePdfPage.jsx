import { useCallback, useRef, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import InfoCard from "../components/features/InfoCard";
import { HiDownload, HiOutlineCloudUpload } from "react-icons/hi";

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

    for (const f of picked) {
      if (!isPdf(f)) return setError("Yalnızca PDF yükleyin.");
      if (f.size > 50 * 1024 * 1024)
        return setError("Her PDF için maksimum 50MB.");
    }

    setError("");
    setDownUrl("");
    const merged = [...files, ...picked].slice(0, 2);
    setFiles(merged);
  };

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      addFiles(e.dataTransfer.files);
      dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
    },
    [files]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    dropRef.current?.classList.add("ring-2", "ring-indigo-500");
  }, []);
  const onDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
  }, []);

  const merge = async () => {
    if (files.length < 2) return setError("Lütfen iki PDF seçin.");
    setLoading(true);
    setError("");
    setDownUrl("");
    try {
      const fd = new FormData();
      fd.append("file1", files[0]);
      fd.append("file2", files[1]);
      const res = await fetch("/api/merge/pdf", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Birleştirme başarısız.");
      setDownUrl(`/api/download/${data.fileId}`);
    } catch (e) {
      setError(e.message || "Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFiles([]);
    setDownUrl("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <main className="relative min-h-dvh bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      {/* subtle bg glow (opsiyonel) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-3xl" />
      </div>

      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* SOL Sütun: Merge UI (inline) */}
          <section className="h-full min-h-[460px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg">
            <h1 className="text-3xl font-semibold tracking-tight">
              PDF'leri Birleştir
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              PDF dosyalarınızı yükleyin, birleşmiş bir PDF olarak indirin.
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
                PDF dosyalarınızı bu alana sürükleyip bırakın
                <br />
                <span className="text-zinc-500">veya</span>
              </p>

              <input
                ref={inputRef}
                id="pdf-input"
                type="file"
                accept="application/pdf,.pdf"
                multiple
                onChange={(e) => e.target.files && addFiles(e.target.files)}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-controls="pdf-input"
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white
                           bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-colors cursor-pointer"
              >
                PDF dosyalarını seç
              </button>

              <p className="mt-3 text-xs text-zinc-500">
                Yalnızca PDF • Her bir dosya max 50MB • En fazla 2 dosya
              </p>

              {/* keyframes bu sayfaya özel */}
              <style>{`@keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}`}</style>
            </div>

            {files.length > 0 && (
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[0, 1].map((i) => {
                  const f = files[i];
                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70"
                    >
                      <p className="text-xs text-zinc-500 mb-1">PDF {i + 1}</p>
                      {f ? (
                        <>
                          <p className="truncate font-medium">{f.name}</p>
                          <p className="text-xs text-zinc-500">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-zinc-400">Seçilmedi</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg border border-red-300/60 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm p-3">
                {error}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={merge}
                disabled={files.length !== 2 || loading}
                className="flex-1 rounded-xl px-4 py-2 text-white font-medium disabled:opacity-50 transition-all
                           bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                           hover:shadow-md active:scale-[0.99] cursor-pointer"
              >
                {loading ? "Birleştiriliyor…" : "PDF’leri Birleştir"}
              </button>
              <button
                onClick={resetAll}
                disabled={loading && !downUrl}
                className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm transition-colors cursor-pointer"
              >
                Sıfırla
              </button>
            </div>

            {downUrl && !loading && (
              <div className="mt-6 rounded-xl border border-emerald-300/60 bg-emerald-50 dark:bg-emerald-900/20 p-4">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  Birleştirme tamam! PDF’i indirebilirsin.
                </p>
                <a
                  href={downUrl}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  <HiDownload className="text-lg" />
                  Birleşmiş PDF’i indir
                </a>
              </div>
            )}
          </section>

          <InfoCard />
        </div>
      </section>

      <Footer />
    </main>
  );
}
