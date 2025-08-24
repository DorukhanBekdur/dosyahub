import { Helmet } from "react-helmet-async";
import SplitPdfCard from "../components/features/SplitPdfCard";
import InfoCard from "../components/features/InfoCard";

const CANONICAL = "https://www.dosyahub.com/split-pdf";

export default function SplitPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DosyaHub PDF Parçalama",
    url: CANONICAL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "41",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://www.dosyahub.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "PDF Parçalama",
        item: CANONICAL,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "PDF nasıl sayfalara bölünür?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PDF dosyanızı yükleyin, ardından 'PDF’i Parçala' butonuna tıklayın. Tüm sayfalar ZIP içinde ayrı PDF'ler olarak iner.",
        },
      },
      {
        "@type": "Question",
        name: "Dosyalarım güvende mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dosyalar yalnızca işlem sırasında işlenir ve kısa süre içinde sistemden silinir.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>PDF Parçalama | DosyaHub</title>
        <meta
          name="description"
          content="PDF dosyalarını sayfalara bölün. DosyaHub PDF Parçalama aracı ile tüm sayfaları tek tıkla ayırın veya ZIP olarak indirin. Hızlı, güvenli, ücretsiz."
        />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="tr" href={CANONICAL} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="PDF Parçalama | DosyaHub" />
        <meta
          property="og:description"
          content="PDF dosyalarını saniyeler içinde sayfalara bölün. Hızlı, güvenli, ücretsiz."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:site_name" content="DosyaHub" />
        <meta
          property="og:image"
          content="https://www.dosyahub.com/og/split-pdf.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Parçalama | DosyaHub" />
        <meta
          name="twitter:description"
          content="PDF dosyalarını hızlıca sayfalara bölün. Ücretsiz DosyaHub aracı."
        />
        <meta
          name="twitter:image"
          content="https://www.dosyahub.com/og/split-pdf.png"
        />

        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <SplitPdfCard />
        <InfoCard />

        <div className="md:col-span-2 mt-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            PDF Parçalama Neden Gerekli ?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Çok sayfalı dosyalarda belirli sayfaları ayırmak, gereksiz sayfaları
            çıkarmak veya bölümleri ayrı paylaşmak için{" "}
            <strong>PDF parçalama</strong> en pratik çözümdür. Eğitim
            materyalleri, sözleşmeler ya da raporları bölüm bölüm göndermek
            istediğinizde tek tıkla sayfalara ayırabilirsiniz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            DosyaHub ile PDF’i Nasıl Parçalarsınız ?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            PDF dosyanızı yükleyin ve <strong>“PDF’i Parçala”</strong> butonuna
            tıklayın. Tüm sayfalar otomatik olarak ayrı PDF’lere dönüştürülür ve
            bir <strong>ZIP</strong> dosyası içinde indirilir. İhtiyacınız varsa{" "}
            <a href="/merge-pdf" className="underline hover:opacity-80">
              PDF birleştirme
            </a>{" "}
            veya{" "}
            <a href="/compress-pdf" className="underline hover:opacity-80">
              PDF sıkıştırma
            </a>{" "}
            araçlarımızla işlem sonrası düzenlemeye devam edebilirsiniz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Kimler Kullanabilir ?
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Öğrenciler: notların yalnızca gerekli sayfalarını paylaşmak</li>
            <li>İş dünyası: sözleşme/raporların ilgili bölümlerini ayırmak</li>
            <li>Serbest çalışanlar: sadece onay sayfalarını göndermek</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">İpuçları</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Büyük dosyalarda daha hızlı indirme için parçalama sonrası ZIP’i
            bilgisayarınızda açıp yalnızca gerekli sayfaları saklayın. Gizlilik
            açısından dosyalar işlem sürecinde geçici olarak işlenir ve kısa
            süre içinde sistemden silinir.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="font-medium">Herhangi bir program gerekir mi ?</p>
              <p>
                Gerekmez. DosyaHub doğrudan tarayıcıda çalışır, kurulum yapmadan
                kullanabilirsiniz.
              </p>
            </div>
            <div>
              <p className="font-medium">Çıktılar nasıl teslim edilir ?</p>
              <p>
                Her sayfa ayrı PDF olarak oluşturulur ve tek bir ZIP dosyası
                halinde indirilir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
