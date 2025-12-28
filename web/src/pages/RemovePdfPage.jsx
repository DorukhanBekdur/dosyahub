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
    <div className="min-h-screen bg-[#0f0a1e] py-12 px-6 lg:px-12 md:py-20">
      <Helmet>
        <title>PDF Sayfa Silme | DosyaHub</title>
        <meta
          name="description"
          content="PDF'ten istediğiniz sayfaları seçip kaldırın. Metin ve kalite korunur. Hızlı ve güvenli."
        />
        <link rel="canonical" href={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <RemovePagesPdfCard />

          <InfoCard />

          <div className="lg:col-span-2 mt-12 p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl text-left">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                PDF’ten Sayfa Silmek Neden Gerekli?
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed mb-8">
                Uzun PDF dosyalarında gereksiz sayfalar yer kaplayabilir veya
                paylaşımı zorlaştırabilir.
                <strong className="text-indigo-400">
                  {" "}
                  PDF Sayfa Silme
                </strong>{" "}
                aracıyla istemediğiniz sayfaları çıkararak dosyanızı
                sadeleştirebilir ve daha kullanışlı hale getirebilirsiniz.
              </p>

              <hr className="my-10 border-white/5" />

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                DosyaHub ile PDF’ten Sayfa Nasıl Silinir?
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                PDF dosyanızı yükleyin, silmek istediğiniz sayfaları{" "}
                <span className="font-semibold text-white underline underline-offset-4 decoration-indigo-500/50">
                  önizlemelerden seçin
                </span>{" "}
                ve{" "}
                <span className="text-rose-400 font-bold italic underline decoration-rose-500/30">
                  “Seçilenleri Sil & Kaydet”
                </span>{" "}
                butonuna tıklayın. Kalan sayfalar yeni bir PDF dosyası halinde
                indirilmeye hazır olacaktır.
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href="/merge-pdf"
                  className="text-indigo-400 text-sm underline hover:text-indigo-300"
                >
                  PDF Birleştirme
                </a>
                <a
                  href="/compress-pdf"
                  className="text-indigo-400 text-sm underline hover:text-indigo-300"
                >
                  PDF Sıkıştırma
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mt-16">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">
                    Kimler Kullanabilir?
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Öğrenciler: Notlardan gereksiz sayfaları kaldırmak için",
                      "İş Dünyası: Sözleşmelerden alakasız sayfaları çıkarmak için",
                      "Serbest Çalışanlar: Yalnızca onaylanan bölümleri paylaşmak için",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-zinc-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">İpuçları</h3>
                  <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                    <p className="text-sm text-zinc-400 leading-relaxed italic">
                      "Gereksiz sayfaları temizlemek dosya boyutunu önemli
                      ölçüde küçültebilir. Güvenliğiniz için tüm işlemler
                      tarayıcı taraflı (local) gerçekleşir."
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-10 border-white/5" />

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Sık Sorulan Sorular
              </h2>
              <div className="grid gap-6">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 transition-colors hover:bg-white/[0.05]">
                  <p className="font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                    Silinen sayfalar geri getirilebilir mi?
                  </p>
                  <p className="text-sm text-zinc-500">
                    Silinen sayfalar sadece indirdiğiniz yeni PDF'te yer almaz.
                    Orijinal dosyanız yerel cihazınızda güvende kalır.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 transition-colors hover:bg-white/[0.05]">
                  <p className="font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-indigo-500 rounded-full" />
                    Toplu silme yapılabiliyor mu?
                  </p>
                  <p className="text-sm text-zinc-500">
                    Evet, önizlemelerden dilediğiniz kadar sayfayı seçip tek
                    seferde temizleyebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
