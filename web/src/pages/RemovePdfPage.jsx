import { Helmet } from "react-helmet-async";
import RemovePagesPdfCard from "../components/remove/RemovePagesPdfCard";
import InfoCard from "../components/features/InfoCard";

const CANONICAL = "https://www.dosyahub.com/remove-pages-pdf";

export default function RemovePagesPdfPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DosyaHub PDF Sayfa Silme",
    url: CANONICAL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
  };

  return (
    <>
      <Helmet>
        <title>PDF Sayfa Silme | DosyaHub</title>
        <meta
          name="description"
          content="PDF'ten istediğiniz sayfaları seçip kaldırın. Metin ve kalite korunur."
        />
        <link rel="canonical" href={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
      </Helmet>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
        <RemovePagesPdfCard />
        <InfoCard />

        <div className="md:col-span-2 mt-8 p-8 md:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm transition-all text-left">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              PDF’ten Sayfa Silmek Neden Gerekli?
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Uzun PDF dosyalarında gereksiz sayfalar yer kaplayabilir veya
              paylaşımı zorlaştırabilir.
              <strong className="text-indigo-500 dark:text-indigo-400">
                {" "}
                PDF Sayfa Silme
              </strong>{" "}
              aracıyla istemediğiniz sayfaları çıkararak dosyanızı
              sadeleştirebilir ve daha kullanışlı hale getirebilirsiniz.
            </p>

            <hr className="my-10 border-zinc-200 dark:border-white/5" />

            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              DosyaHub ile PDF’ten Sayfa Nasıl Silinir?
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              PDF dosyanızı yükleyin, silmek istediğiniz sayfaları{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                önizlemelerden seçin
              </span>
              ve{" "}
              <span className="text-rose-500 font-semibold">
                “Seçilenleri Sil & Yeni PDF’i İndir”
              </span>{" "}
              butonuna tıklayın. Kalan sayfalar yeni bir PDF dosyası halinde
              indirilmeye hazır olacaktır. Daha sonra{" "}
              <a
                href="/merge-pdf"
                className="text-indigo-500 underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                PDF birleştirme
              </a>{" "}
              veya{" "}
              <a
                href="/compress-pdf"
                className="text-indigo-500 underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                PDF sıkıştırma
              </a>{" "}
              araçlarımızla ek düzenlemeler yapabilirsiniz.
            </p>

            <div className="grid md:grid-cols-2 gap-10 mt-12">
              <div className="space-y-4">
                <h2 className="text-xl font-bold dark:text-white">
                  Kimler Kullanabilir?
                </h2>
                <ul className="space-y-3">
                  {[
                    "Öğrenciler: notlardan gereksiz sayfaları kaldırmak",
                    "İş dünyası: sözleşme veya raporlardan alakasız sayfaları çıkarmak",
                    "Serbest çalışanlar: yalnızca onaylanan bölümleri paylaşmak",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* İpuçları */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold dark:text-white">İpuçları</h2>
                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                    Çok sayfalı PDF’lerde gereksiz sayfaları kaldırarak dosya
                    boyutunu küçültebilirsiniz. Gizlilik açısından dosyalar
                    yalnızca işlem sırasında geçici olarak tutulur.
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-10 border-zinc-200 dark:border-white/5" />

            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Sık Sorulan Sorular
            </h2>
            <div className="grid gap-6">
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5">
                <p className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 italic">
                  Silinen sayfalar geri getirilebilir mi?
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Silinen sayfalar yeni oluşturulan PDF’te yer almaz. Orijinal
                  dosya değişmediği için tekrar yükleyerek farklı kombinasyonlar
                  oluşturabilirsiniz.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5">
                <p className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 italic">
                  Birden fazla PDF’i aynı anda sayfa silmek için yükleyebilir
                  miyim?
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Önce{" "}
                  <a href="/merge-pdf" className="text-indigo-500 underline">
                    PDF birleştirme
                  </a>{" "}
                  aracını kullanarak dosyaları tek PDF haline getirin, ardından
                  bu araçla istemediğiniz sayfaları çıkarın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
