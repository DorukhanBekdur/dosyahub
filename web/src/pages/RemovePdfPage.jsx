// src/pages/RemovePagesPdfPage.jsx
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
      </section>
    </>
  );
}
