import { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import InfoCard from "../components/features/InfoCard";
import { HiDownload, HiOutlineCloudUpload } from "react-icons/hi";

const API_BASE = "https://api.dosyahub.com";
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
    for (const f of picked) {
      if (!isPdf(f)) return setError("Yalnızca PDF yükleyin.");
      if (f.size > 50 * 1024 * 1024)
        return setError("Her PDF için maksimum 50MB.");
    }
    setError("");
    setDownUrl("");
    setFiles((prev) => [...prev, ...picked].slice(0, 2));
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    addFiles(e.dataTransfer.files);
    dropRef.current?.classList.remove("ring-2", "ring-indigo-500");
  }, []);
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
      const res = await fetch(`${API_BASE}/api/merge/pdf`, {
        method: "POST",
        body: fd,
      });
      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json")
        ? await res.json()
        : { error: await res.text() };
      if (!res.ok) throw new Error(data?.error || "Birleştirme başarısız.");
      setDownUrl(`${API_BASE}/api/download/${data.fileId}`);
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

  // ---- JSON-LD: WebApplication + FAQ ----
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DosyaHub PDF Birleştirme",
    url: CANONICAL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "58",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "PDF birleştirme nasıl yapılır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dosyalarınızı yükleyin, iki PDF'i seçin ve 'PDF’leri Birleştir' butonuna tıklayın. İşlem tamamlanınca birleşmiş PDF'i indirebilirsiniz.",
        },
      },
      {
        "@type": "Question",
        name: "Dosyalarım güvende mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dosyalar yalnızca işlem sırasında geçici olarak işlenir ve kısa süre içinde silinir.",
        },
      },
    ],
  };

  return (
    <>
      {/* HEAD / META */}
      <Helmet>
        <title>PDF Birleştirme | DosyaHub</title>
        <meta
          name="description"
          content="PDF dosyalarını hızlı ve güvenli şekilde birleştirin. DosyaHub PDF Birleştirme aracı ile belgelerinizi saniyeler içinde tek dosyada toplayın."
        />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="tr" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PDF Birleştirme | DosyaHub" />
        <meta
          property="og:description"
          content="PDF dosyalarını saniyeler içinde birleştirin. Hızlı, güvenli, ücretsiz."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:site_name" content="DosyaHub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Birleştirme | DosyaHub" />
        <meta
          name="twitter:description"
          content="PDF dosyalarını hızlıca birleştir. Ücretsiz DosyaHub aracı."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <section className="h-full min-h-[460px] flex flex-col bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:shadow-lg">
          <h1 className="text-3xl font-semibold tracking-tight">
            PDF Birleştirme
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            PDF dosyalarınızı yükleyin ve saniyeler içinde tek bir dosyada
            birleştirin.
          </p>

          <div
            ref={dropRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className="relative mt-6 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-10 flex flex-col items-center justify-center text-center transition-all overflow-hidden
                       bg-gradient-to-b from-zinc-50/80 to-zinc-100/60 dark:from-zinc-800/40 dark:to-zinc-800/20"
            aria-label="PDF birleştirme yükleme alanı"
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
              PDF Yükle
            </button>

            <p className="mt-3 text-xs text-zinc-500">
              Yalnızca PDF • Her bir dosya max 50MB • En fazla 2 dosya
            </p>

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

        <div className="md:col-span-2 mt-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            PDF Birleştirme Neden Gerekli?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Günlük hayatta birden fazla PDF belgesiyle çalışmak yaygındır:
            sözleşmeler, faturalar, ders notları veya raporlar ayrı dosyalar
            halinde olabilir. Bu belgeleri tek bir dosyada toplamak hem
            paylaşımı kolaylaştırır hem de düzen sağlar. İşte burada
            <strong> PDF birleştirme</strong> ihtiyacı doğar.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            DosyaHub ile PDF Birleştirme
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            DosyaHub, ekstra program indirmeden tarayıcı üzerinden PDF’leri
            birleştirme olanağı sunar. İki PDF yükleyin, “PDF’leri Birleştir”
            butonuna tıklayın ve birkaç saniye içinde yeni dosyanızı indirin.
            Alternatif işlemler mi lazım?
            <a href="/split-pdf" className="underline hover:opacity-80">
              {" "}
              PDF parçalama
            </a>{" "}
            veya
            <a href="/compress-pdf" className="underline hover:opacity-80">
              {" "}
              PDF sıkıştırma{" "}
            </a>
            sayfalarımıza da göz atabilirsiniz.
          </p>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            Araç; küçük dosyalarla hızlı çalışacak şekilde optimize edilmiştir
            (tek dosya maksimum 50 MB). Tüm işlemler güvenli bağlantı üzerinden
            yapılır ve dosyalar işlem sonrasında kısa süre içinde sistemden
            silinir. “PDF merge” ihtiyacınız olduğunda DosyaHub, kolay arayüzü
            ve temiz çıktılarıyla iş akışınızı hızlandırır.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Kimler Kullanabilir?
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Öğrenciler: ders notlarını tek PDF’te toplamak için</li>
            <li>İş dünyası: sözleşme ve belgeleri düzenli sunmak için</li>
            <li>Serbest çalışanlar: fatura ve teklifleri birleştirmek için</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="font-medium">
                Herhangi bir program yüklemem gerekiyor mu?
              </p>
              <p>
                Hayır. DosyaHub tamamen tarayıcı üzerinden çalışır, ek yazılım
                gerekmez.
              </p>
            </div>
            <div>
              <p className="font-medium">
                İşlem sırasında dosyalarım güvende mi?
              </p>
              <p>
                Dosyalar yalnızca işlem esnasında işlenir ve kısa süre sonra
                sistemden silinir.
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-6">
            Hazır mısınız? Şimdi iki dosyanızı seçin ve{" "}
            <strong>PDF’leri birleştirmeye</strong> başlayın.
          </p>
        </div>
      </section>
    </>
  );
}
