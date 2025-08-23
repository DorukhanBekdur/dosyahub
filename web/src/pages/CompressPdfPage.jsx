import { useCallback, useRef, useState } from "react";
import InfoCard from "../components/features/InfoCard";
import { HiDownload, HiOutlineCloudUpload } from "react-icons/hi";

const API_BASE = "https://api.dosyahub.com";

export default function CompressPdfPage() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(70);
  const [downUrl, setDownUrl] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
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
    if (picked.size < 5 * 1024 * 1024)
      return setError(
        "Bu dosya zaten küçük (min 5 MB). Sıkıştırma, genelde 5 MB üzerindeki dosyalarda anlamlı sonuç verir."
      );
    setError("");
    setDownUrl("");
    setStats(null);
    setFile(picked);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    pickFile(e.dataTransfer.files);
    dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    dropRef.current?.classList.add("ring-2", "ring-indigo-500");
  }, []);
  const onDragLeave = useCallback(() => {
    dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
  }, []);

  const compress = async () => {
    if (!file) return setError("Lütfen bir PDF seçin.");
    setLoading(true);
    setError("");
    setDownUrl("");
    setStats(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("quality", String(quality));

      const res = await fetch(`${API_BASE}/api/compress/pdf`, {
        method: "POST",
        body: fd,
      });

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json")
        ? await res.json().catch(() => ({}))
        : { error: await res.text() };

      if (!res.ok) {
        const map = {
          400: "Geçersiz istek. Dosyayı kontrol edin.",
          413: "Dosya çok büyük. Lütfen 100MB altı PDF yükleyin.",
          415: "Desteklenmeyen içerik. Yalnızca PDF kabul edilir.",
          422: "PDF sıkıştırılamadı. Dosya bozuk/şifreli olabilir.",
          500: "Sunucuda bir sorun oluştu. Biraz sonra tekrar deneyin.",
        };
        throw new Error(
          data?.error || map[res.status] || "Sıkıştırma başarısız."
        );
      }

      setDownUrl(`${API_BASE}/api/download/${data.fileId}`);
      if (
        typeof data?.beforeBytes === "number" &&
        typeof data?.afterBytes === "number"
      ) {
        setStats({
          beforeBytes: data.beforeBytes,
          afterBytes: data.afterBytes,
        });
      }
    } catch (e) {
      setError(e.message || "Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setDownUrl("");
    setStats(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const fmt = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";
  const ratio =
    stats && stats.beforeBytes > 0
      ? Math.max(
          0,
          100 - Math.round((stats.afterBytes / stats.beforeBytes) * 100)
        )
      : null;

  return (
    <section className="grid md:grid-cols-2 gap-6 md:gap-8">
      <section className="h-full min-h-[500px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg">
        <h1 className="text-3xl font-semibold tracking-tight">PDF Sıkıştır</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          PDF dosyanızın boyutunu azaltın, kaliteyi koruyarak daha hızlı
          paylaşın.
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
            PDF dosyanızı bu alana sürükleyip bırakın
            <br />
            <span className="text-zinc-500">veya</span>
          </p>

          <input
            ref={inputRef}
            id="pdf-input"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => e.target.files && pickFile(e.target.files)}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-controls="pdf-input"
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white
                       bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-colors cursor-pointer"
          >
            PDF Yükle
          </button>

          <p className="mt-3 text-xs text-zinc-500">
            Yalnızca PDF • Min 5MB • Max 100MB • Tek dosya
          </p>

          <style>{`@keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}`}</style>
        </div>

        {file && (
          <div className="mt-6 grid gap-3">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70">
              <p className="text-xs text-zinc-500 mb-1">Seçili PDF</p>
              <p className="truncate font-medium">{file.name}</p>
              <p className="text-xs text-zinc-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70">
              <div className="flex items-center justify-between">
                <label htmlFor="quality" className="text-sm font-medium">
                  Sıkıştırma Kalitesi
                </label>
                <span className="text-xs text-zinc-500">{quality}</span>
              </div>
              <input
                id="quality"
                type="range"
                min={30}
                max={90}
                step={5}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="mt-3 w-full accent-indigo-600"
              />
              <div className="mt-1 flex justify-between text-xs text-zinc-500">
                <span>Daha küçük dosya</span>
                <span>Daha yüksek kalite</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div
            className={`mt-4 rounded-lg text-sm p-3 border
              ${
                error.includes("küçük") || error.includes("fayda")
                  ? "border-yellow-300/60 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
                  : "border-red-300/60 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
              }`}
            aria-live="polite"
          >
            {error}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={compress}
            disabled={!file || loading}
            className="flex-1 rounded-xl px-4 py-2 text-white font-medium disabled:opacity-50 transition-all
                       bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                       hover:shadow-md active:scale-[0.99] cursor-pointer"
          >
            {loading ? "Sıkıştırılıyor…" : "PDF’yi Sıkıştır"}
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
              Sıkıştırma tamam! PDF’i indirebilirsin.
            </p>

            {stats && (
              <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                Boyut: {fmt(stats.beforeBytes)} → {fmt(stats.afterBytes)}
                {typeof ratio === "number" ? ` (≈ %${ratio} küçülme)` : ""}
              </p>
            )}

            <a
              href={downUrl}
              download
              className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <HiDownload className="text-lg" />
              Sıkıştırılmış PDF’i indir
            </a>
          </div>
        )}
      </section>

      <InfoCard />
    </section>
  );
}
