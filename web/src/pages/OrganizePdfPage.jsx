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
    <>
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

      <section className="grid md:grid-cols-2 gap-6 md:gap-8">
        <OrganizePdfCard />
        <InfoCard />

        <div className="md:col-span-2 mt-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            PDF Sayfalarını Sıralamak Neden Gerekli ?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Uzun PDF dosyalarında sayfaların karışık olması okuma ve paylaşım
            sürecini zorlaştırabilir. <strong>PDF sıralama</strong> aracıyla
            sayfaları sürükle-bırak yöntemiyle yeniden düzenleyebilir,
            istediğiniz sıraya göre tek bir dosya halinde kaydedebilirsiniz.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            DosyaHub ile PDF Nasıl Sıralanır ?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            PDF dosyanızı yükleyin, sayfaları sürükle-bırak ile istediğiniz
            sıraya getirin ve <strong>“PDF’i Kaydet”</strong> butonuna tıklayın.
            Düzenlenmiş PDF dosyanız anında indirilmeye hazır hale gelir. Daha
            sonra{" "}
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
            Kimler Kullanabilir ?
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Öğrenciler: not ve sunum sayfalarını düzenli hale getirmek</li>
            <li>İş dünyası: sözleşme ve raporların sırasını düzeltmek</li>
            <li>
              Tasarımcılar: portfolyo ve katalog sayfalarını istediği sıraya
              koymak
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">İpuçları</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Çok sayfalı dosyalarda sürükle-bırak kolaylığı sayesinde birkaç
            saniyede istediğiniz düzeni oluşturabilirsiniz. Gizlilik açısından
            dosyalar yalnızca işlem sırasında geçici olarak tutulur ve kısa süre
            içinde sistemden silinir.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="font-medium">Sayfa numaraları değişir mi ?</p>
              <p>
                Hayır, sayfa içeriği olduğu gibi korunur. Yalnızca dosyanın
                içindeki sayfaların sırası değişir.
              </p>
            </div>
            <div>
              <p className="font-medium">
                Birden fazla PDF’i aynı anda sıralayabilir miyim ?
              </p>
              <p>
                Önce birleştirme aracını kullanarak PDF’leri tek dosya haline
                getirebilir, ardından sıralama aracıyla sayfaları istediğiniz
                gibi düzenleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
