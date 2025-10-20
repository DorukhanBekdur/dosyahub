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
    <>
      <Helmet>
        <title>PDF Döndürme | DosyaHub</title>
        <meta
          name="description"
          content="PDF sayfalarını 90°, 180° veya 270° olacak şekilde seçip döndürün. Önizlemeden sayfaları işaretleyin ve tek tıkla yeni PDF’i indirin."
        />
        <link rel="canonical" href={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
      </Helmet>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <RotatePdfCard />
        <InfoCard />

        <div className="md:col-span-2 mt-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">PDF Döndürme Nedir ?</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Taranmış veya yanlış yönlenmiş sayfaları{" "}
            <strong>90°, 180° veya 270°</strong> açıyla hızlıca
            düzeltebilirsiniz. Araç, <strong>seçtiğiniz sayfaları</strong>{" "}
            döndürür ve yeni bir PDF olarak indirmenizi sağlar.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            DosyaHub ile PDF Nasıl Döndürülür ?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            PDF’i yükleyin, döndürmek istediğiniz sayfaları{" "}
            <strong>önizlemelerden seçin</strong>, açıyı{" "}
            <strong>90° / 180° / 270°</strong> olarak belirleyin ve{" "}
            <strong>“Döndür & Yeni PDF’i İndir”</strong> butonuna tıklayın.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="font-medium">
                Tüm sayfaları tek seferde döndürebilir miyim ?
              </p>
              <p>
                Yalnızca <strong>seçtiğiniz sayfalar</strong> döndürülür. Tümünü
                döndürmek isterseniz önizlemede tüm sayfaları
                işaretleyebilirsiniz.
              </p>
            </div>

            <div>
              <p className="font-medium">
                Mevcut rotasyon üzerine ekleme yapıyor mu ?
              </p>
              <p>
                Hayır. Seçtiğiniz sayfalar doğrudan{" "}
                <strong>seçtiğiniz açıya sabitlenir </strong>
                (ör. 270° seçerseniz sayfa saat yönünde 270° dönmüş olur).
              </p>
            </div>

            <div>
              <p className="font-medium">
                Dosya boyutu ve sayfa sınırı var mı ?
              </p>
              <p>
                Maksimum <strong>50&nbsp;MB</strong> ve yaklaşık{" "}
                <strong>50 sayfa </strong>
                önerilir. Çok büyük dosyalarda tarayıcı belleği sınırlı
                olabilir.
              </p>
            </div>

            <div>
              <p className="font-medium">Orijinal dosyam değişir mi ?</p>
              <p>
                Hayır. İşlem sonucunda <strong>yeni bir PDF</strong>{" "}
                oluşturulur; orijinal dosyanız değişmez.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
