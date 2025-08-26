import { Helmet } from "react-helmet-async";
import ImagesToPdfCard from "../components/imagesToPdf/ImagesToPdfCard";
import InfoCard from "../components/features/InfoCard";

const CANONICAL = "https://www.dosyahub.com/images-to-pdf";

export default function ImagesToPdfPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DosyaHub Görselden PDF",
    url: CANONICAL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
  };

  return (
    <>
      <Helmet>
        <title>Görselden PDF | DosyaHub</title>
        <meta
          name="description"
          content="Görselleri sürükle-bırak ile sıralayın, sayfa boyutunu ve kaliteyi seçin, tek tıkla PDF’e dönüştürün."
        />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="tr" href={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
      </Helmet>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <ImagesToPdfCard />
        <InfoCard />

        <div className="md:col-span-2 mt-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            Görselleri PDF’e Dönüştürmek Neden Gerekli ?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Fotoğraflar ve görseller farklı cihazlarda ve formatlarda dağınık
            halde olabilir. <strong>Görsel → PDF</strong> aracıyla tüm
            görsellerinizi tek bir PDF dosyasında birleştirerek paylaşımı
            kolaylaştırabilir, arşivlemeyi daha düzenli hale getirebilirsiniz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            DosyaHub ile Görsel Nasıl PDF’e Dönüştürülür ?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            PNG, JPG veya WEBP formatındaki görsellerinizi yükleyin. Sistem
            görselleri otomatik olarak sıralı bir <strong>PDF dosyası</strong>{" "}
            haline getirecek ve tek tıkla indirmenize hazır hale getirecektir.
            Daha sonra{" "}
            <a href="/merge-pdf" className="underline hover:opacity-80">
              PDF birleştirme
            </a>{" "}
            veya{" "}
            <a href="/compress-pdf" className="underline hover:opacity-80">
              PDF sıkıştırma
            </a>{" "}
            araçlarımızı kullanarak ek düzenlemeler yapabilirsiniz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Kimler Kullanabilir ?
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              Öğrenciler: ödev veya not fotoğraflarını tek bir PDF’te toplamak
            </li>
            <li>
              İş dünyası: rapor, fatura veya görsel belgeleri düzenli paylaşmak
            </li>
            <li>
              Serbest çalışanlar: tasarım veya proje çıktılarından tek bir dosya
              oluşturmak
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">İpuçları</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Çok sayıda görseli tek dosyada birleştirerek e-posta gönderiminde
            kolaylık sağlayabilirsiniz. Gizlilik açısından dosyalar yalnızca
            işlem sırasında geçici olarak işlenir ve kısa süre içinde sistemden
            silinir.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="font-medium">
                Görsellerin sırası nasıl belirleniyor ?
              </p>
              <p>
                Yüklediğiniz veya sürükleyip bıraktığınız sıraya göre PDF içinde
                sıralanır.
              </p>
            </div>
            <div>
              <p className="font-medium">
                Desteklenen dosya türleri nelerdir ?
              </p>
              <p>
                PNG, JPG ve WEBP formatları desteklenmektedir. Maksimum dosya
                boyutu görsel başına 25MB’tır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
