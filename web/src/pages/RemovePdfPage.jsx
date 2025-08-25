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

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <RemovePagesPdfCard />
        <InfoCard />

        <div className="md:col-span-2 mt-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            PDF’ten Sayfa Silmek Neden Gerekli?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Uzun PDF dosyalarında gereksiz sayfalar yer kaplayabilir veya
            paylaşımı zorlaştırabilir.
            <strong>PDF Sayfa Silme</strong> aracıyla istemediğiniz sayfaları
            çıkararak dosyanızı sadeleştirebilir ve daha kullanışlı hale
            getirebilirsiniz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            DosyaHub ile PDF’ten Sayfa Nasıl Silinir?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            PDF dosyanızı yükleyin, silmek istediğiniz sayfaları{" "}
            <strong>önizlemelerden seçin</strong>
            ve <strong>“Seçilenleri Sil & Yeni PDF’i İndir”</strong> butonuna
            tıklayın. Kalan sayfalar yeni bir PDF dosyası halinde indirilmeye
            hazır olacaktır. Daha sonra{" "}
            <a href="/merge-pdf" className="underline hover:opacity-80">
              PDF birleştirme
            </a>{" "}
            veya{" "}
            <a href="/compress-pdf" className="underline hover:opacity-80">
              PDF sıkıştırma
            </a>{" "}
            araçlarımızla ek düzenlemeler yapabilirsiniz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Kimler Kullanabilir?
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Öğrenciler: notlardan gereksiz sayfaları kaldırmak</li>
            <li>
              İş dünyası: sözleşme veya raporlardan alakasız sayfaları çıkarmak
            </li>
            <li>Serbest çalışanlar: yalnızca onaylanan bölümleri paylaşmak</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">İpuçları</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Çok sayfalı PDF’lerde gereksiz sayfaları kaldırarak dosya boyutunu
            küçültebilirsiniz. Gizlilik açısından dosyalar yalnızca işlem
            sırasında geçici olarak tutulur ve kısa süre içinde sistemden
            silinir.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="font-medium">
                Silinen sayfalar geri getirilebilir mi?
              </p>
              <p>
                Silinen sayfalar yeni oluşturulan PDF’te yer almaz. Orijinal
                dosya değişmediği için tekrar yükleyerek farklı kombinasyonlar
                oluşturabilirsiniz.
              </p>
            </div>
            <div>
              <p className="font-medium">
                Birden fazla PDF’i aynı anda sayfa silmek için yükleyebilir
                miyim?
              </p>
              <p>
                Önce{" "}
                <a href="/merge-pdf" className="underline hover:opacity-80">
                  PDF birleştirme
                </a>{" "}
                aracını kullanarak dosyaları tek PDF haline getirin, ardından bu
                araçla istemediğiniz sayfaları çıkarın.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
