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
          text: "PDF dosyanızı yükleyin, ardından 'PDF’i Parçala' butonuna tıklayın. Sayfalar saniyeler içinde ayrılır ve tek tek indirebilirsiniz.",
        },
      },
      {
        "@type": "Question",
        name: "Dosyalarım güvende mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evet, DosyaHub sunucusuz teknoloji kullanır. Dosyalarınız cihazınızdan çıkmadan tarayıcınızda işlenir.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] py-12 px-6 lg:px-12 md:py-20">
      <Helmet>
        <title>PDF Parçalama | DosyaHub</title>
        <meta
          name="description"
          content="PDF dosyalarını sayfalara bölün. Sunucuya yüklemeden, tarayıcınızda %100 güvenli ve hızlı PDF parçalama aracı."
        />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="tr" href={CANONICAL} />

        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <section className="grid lg:grid-cols-2 gap-10 items-start">
          <SplitPdfCard />
          <InfoCard />

          <div className="lg:col-span-2 mt-12 p-10 md:p-16 rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
              PDF Parçalama Neden Gerekli?
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-zinc-400 text-sm leading-relaxed">
              <p>
                Çok sayfalı dosyalarda belirli sayfaları ayırmak, gereksiz
                sayfaları çıkarmak veya bölümleri ayrı paylaşmak için{" "}
                <strong className="text-white font-medium">
                  PDF parçalama
                </strong>{" "}
                en pratik çözümdür. Eğitim materyalleri, sözleşmeler ya da
                raporları bölüm bölüm göndermek istediğinizde tek tıkla
                sayfalara ayırabilirsiniz.
              </p>
              <p>
                DosyaHub'ın farkı, bu işlemi{" "}
                <strong className="text-indigo-400">
                  sunucusuz (client-side)
                </strong>
                olarak yapmasıdır. Dosyanız internete yüklenmez, böylece hem
                internet paketinizden tasarruf edersiniz hem de belgelerinizin
                gizliliğini en üst seviyede tutarsınız.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Kimler Kullanabilir?
                </h3>
                <ul className="space-y-3 text-zinc-400 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-indigo-500" />{" "}
                    Öğrenciler: Notların gerekli sayfalarını ayırmak.
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-indigo-500" /> İş
                    Dünyası: Sözleşme bölümlerini ayırmak.
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-indigo-500" />{" "}
                    Freelance: Onay sayfalarını göndermek.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Sık Sorulan Sorular
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-zinc-200 font-medium text-sm">
                      Program gerekir mi?
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">
                      Hayır, tamamen tarayıcı tabanlı çalışır.
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium text-sm">
                      Hız sınırı var mı?
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">
                      İşlem gücü cihazınıza bağlıdır, genelde saniyeler sürer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-500/5 rounded-3xl p-6 border border-indigo-500/10">
                <h3 className="text-indigo-400 font-semibold text-lg mb-2">
                  İpucu
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Büyük dosyalarda işlem bittikten sonra sayfaları tek tek
                  indirebilir, ardından ihtiyacınız olmayanları cihazınızdan
                  silerek yer kazanabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
