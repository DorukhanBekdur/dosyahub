import { Helmet } from "react-helmet-async";
import OrganizePdfCard from "../components/organizePdf/OrganizePdfCard";
import InfoCard from "../components/features/InfoCard";

const CANONICAL = "https://www.dosyahub.com/organize-pdf";

export default function OrganizePdfPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DosyaHub PDF Sayfa Sıralama",
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
        name: "PDF Sayfa Sıralama",
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
        name: "PDF sayfaları nasıl sıralanır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PDF'i yükleyin, küçük önizlemeleri sürükle-bırak ile yeniden düzenleyin ve 'Yeni PDF’i İndir' butonuna tıklayın.",
        },
      },
      {
        "@type": "Question",
        name: "Dosyalarım güvende mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "İşlem tarayıcıda gerçekleşir; dosyalar yalnızca işlem sırasında geçici olarak işlenir ve kısa süre içinde silinir.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] py-12 px-6 lg:px-12 md:py-20">
      <Helmet>
        <title>PDF Sayfa Sıralama (Organize) | DosyaHub</title>
        <meta
          name="description"
          content="PDF sayfalarını sürükle-bırak ile yeniden sıralayın ve yeni PDF’i indirin. Hızlı, güvenli, ücretsiz."
        />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="tr" href={CANONICAL} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="PDF Sayfa Sıralama | DosyaHub" />
        <meta
          property="og:description"
          content="PDF sayfalarını sürükle-bırak ile kolayca yeniden düzenleyin ve tek tıkla indirin."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:site_name" content="DosyaHub" />
        <meta
          property="og:image"
          content="https://www.dosyahub.com/og/organize-pdf.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <OrganizePdfCard />

          <InfoCard />

          <div className="lg:col-span-2 mt-12 p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              PDF Sayfalarını Sıralamak Neden Gerekli?
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Uzun PDF dosyalarında sayfaların karışık olması okuma ve paylaşım
              sürecini zorlaştırabilir. <strong>PDF sıralama</strong> aracıyla
              sayfaları sürükle-bırak yöntemiyle yeniden düzenleyebilir,
              istediğiniz sıraya göre tek bir dosya halinde kaydedebilirsiniz.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  DosyaHub ile PDF Nasıl Sıralanır?
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  PDF dosyanızı yükleyin, sayfaları sürükle-bırak ile
                  istediğiniz sıraya getirin ve{" "}
                  <strong>“Sıralamayı Kaydet”</strong> butonuna tıklayın.
                  Düzenlenmiş PDF dosyanız anında indirilmeye hazır hale gelir.
                </p>
                <div className="flex gap-4">
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
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Kimler Kullanabilir?
                </h2>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Öğrenciler: Not ve sunum sayfalarını düzenlemek için
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    İş Dünyası: Sözleşme ve raporların sırasını düzeltmek için
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Tasarımcılar: Portfolyo sayfalarını organize etmek için
                  </li>
                </ul>
              </div>
            </div>

            <hr className="border-white/5 my-10" />

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 text-left">
                  İpuçları
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Çok sayfalı dosyalarda sürükle-bırak kolaylığı sayesinde
                  birkaç saniyede istediğiniz düzeni oluşturabilirsiniz.
                  Dosyalarınız tarayıcı tabanlı işlendiği için gizliliğiniz %100
                  korunur.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 text-left">
                  Sık Sorulan Sorular
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-medium text-sm">
                      Sayfa numaraları değişir mi?
                    </p>
                    <p className="text-zinc-500 text-sm">
                      Hayır, içerik korunur, sadece sayfaların dizilimi değişir.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Güvenli mi?
                    </p>
                    <p className="text-zinc-500 text-sm">
                      Evet, tüm işlemler yerel cihazınızda gerçekleşir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
