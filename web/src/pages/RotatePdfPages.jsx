import { Helmet } from "react-helmet-async";
import RotatePdfCard from "../components/rotate/RotatePdfCard";
import InfoCard from "../components/features/InfoCard";

const CANONICAL = "https://www.dosyahub.com/rotate-pdf";

export default function RotatePdfPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DosyaHub PDF Döndürme",
    url: CANONICAL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] py-12 px-6 lg:px-12 md:py-20">
      <Helmet>
        <title>PDF Döndürme | DosyaHub</title>
        <meta
          name="description"
          content="PDF sayfalarını 90°, 180° veya 270° olacak şekilde seçip döndürün. Hızlı, güvenli ve ücretsiz PDF yönü düzeltme aracı."
        />
        <link rel="canonical" href={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <RotatePdfCard />

          <InfoCard />

          <div className="lg:col-span-2 mt-12 p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl text-left">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                PDF Döndürme Nedir?
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed mb-8">
                Taranmış veya yanlış yönlenmiş sayfaları{" "}
                <strong className="text-indigo-400">90°, 180° veya 270°</strong>{" "}
                açıyla hızlıca düzeltebilirsiniz. DosyaHub PDF döndürme aracı,
                seçtiğiniz sayfaları anında istediğiniz yöne çevirir ve yüksek
                kalitede indirmenizi sağlar.
              </p>

              <hr className="my-10 border-white/5" />

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                DosyaHub ile PDF Nasıl Döndürülür?
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                PDF’i yükleyin, döndürmek istediğiniz sayfaları{" "}
                <span className="font-semibold text-white underline underline-offset-4 decoration-indigo-500/50">
                  önizlemelerden seçin
                </span>
                , açıyı kontrol panelinden belirleyin ve{" "}
                <span className="text-indigo-400 font-bold italic">
                  “Döndür & Yeni PDF’i İndir”
                </span>{" "}
                butonuna tıklayın. İşlem tamamlandığında dosyanız otomatik
                olarak hazır hale gelecektir.
              </p>

              <div className="grid md:grid-cols-2 gap-10 mt-16">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">
                    Teknik Detaylar
                  </h3>
                  <ul className="space-y-4 text-sm text-zinc-400">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      Mevcut rotasyon üzerine ekleme yapılmaz, seçtiğiniz açıya
                      sabitlenir.
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      Maksimum 50 MB ve 50 sayfa önerilir.
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">
                    Güvenlik ve Gizlilik
                  </h3>
                  <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                    <p className="text-sm text-zinc-400 leading-relaxed italic">
                      "Tüm işlemler tarayıcınızda (yerel olarak) yapılır. PDF
                      verileriniz sunucularımıza yüklenmez, gizliliğiniz %100
                      korunur."
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-10 border-white/5" />

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Sık Sorulan Sorular
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="font-bold text-white mb-2">
                    Tüm sayfaları aynı anda döndürebilir miyim?
                  </p>
                  <p className="text-sm text-zinc-500">
                    Evet, varsayılan olarak tüm sayfalar seçili gelir. Tek tıkla
                    tüm dökümanı döndürebilirsiniz.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="font-bold text-white mb-2">
                    Orijinal dosyam zarar görür mü?
                  </p>
                  <p className="text-sm text-zinc-500">
                    Hayır, orijinal dosyanıza dokunulmaz. Sistem yeni bir PDF
                    dosyası üretir.
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
