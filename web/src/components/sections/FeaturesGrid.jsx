import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { PDF_TOOLS } from "../../config/toolsCatalog";
import {
  FEATURES_BOTTOM_FADE,
  FEATURES_TOP_FADE,
  LANDING_NAVY_BG,
} from "../../config/landingTheme";

const SECTION_COPY = {
  title: "Tüm PDF araçları",
  description:
    "PDF dosyalarınızı birleştirmek, parçalamak, sıkıştırmak ve düzenlemek için ihtiyacınız olan tüm araçlar.",
};

const TOOL_CARD_COPY = {
  "/merge-pdf": {
    title: "Birleştirme",
    description: "Birden fazla PDF dosyasını tek belgede birleştirin.",
  },
  "/split-pdf": {
    title: "Parçalama",
    description: "PDF belgelerinizi sayfa sayfa ayrı dosyalara bölün.",
  },
  "/compress-pdf": {
    title: "Sıkıştırma",
    description: "Dosya boyutunu küçültün, paylaşımı kolaylaştırın.",
  },
  "/organize-pdf": {
    title: "Sıralama",
    description: "Sayfaları sürükleyip bırakarak istediğiniz sıraya alın.",
  },
  "/remove-pages-pdf": {
    title: "Sayfa Silme",
    description: "İstemediğiniz sayfaları PDF içinden kolayca çıkarın.",
  },
  "/images-to-pdf": {
    title: "Görsel → PDF",
    description: "JPG ve PNG görsellerini hızlıca PDF'e dönüştürün.",
  },
  "/rotate-pdf": {
    title: "Döndürme",
    description: "PDF sayfalarını doğru yöne çevirerek düzenleyin.",
  },
  "/watermark-pdf": {
    title: "Filigran",
    description: "Belgelerinize metin veya görsel filigran ekleyin.",
  },
};

function getCardCopy(tool) {
  return (
    TOOL_CARD_COPY[tool.to] ?? {
      title: tool.label.replace(/^PDF\s+/, ""),
      description: tool.description,
    }
  );
}

export default function FeaturesGrid() {
  return (
    <section
      id="tools"
      className={`relative overflow-hidden ${LANDING_NAVY_BG} pt-20 pb-20 sm:pt-24 sm:pb-24`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-0 h-36 bg-gradient-to-b ${FEATURES_TOP_FADE}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b ${FEATURES_BOTTOM_FADE}`}
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl lg:text-[2rem]">
            {SECTION_COPY.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-400 sm:text-lg">
            {SECTION_COPY.description}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PDF_TOOLS.map((tool) => {
            const { title, description } = getCardCopy(tool);
            const Icon = tool.icon;

            return (
              <li key={tool.to}>
                <Link
                  to={tool.to}
                  className="group relative flex h-full min-h-[190px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07] outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A13]"
                >
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />

                  <span className="relative z-10 flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20 transition-colors duration-300 group-hover:bg-violet-500 group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <HiArrowRight
                      className="h-5 w-5 shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-300"
                      aria-hidden
                    />
                  </span>

                  <span className="relative z-10 mt-5 flex flex-1 flex-col">
                    <h3 className="text-lg font-semibold text-slate-50 transition-colors group-hover:text-violet-200">
                      {title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                      {description}
                    </p>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
