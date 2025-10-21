import { Link } from "react-router-dom";
import {
  HiCollection,
  HiViewGrid,
  HiPhotograph,
  HiArchive,
  HiRefresh,
  HiTable,
  HiTrash,
} from "react-icons/hi";
import { HiArrowsUpDown } from "react-icons/hi2";

export default function FeaturesGrid({ items }) {
  const defaultItems = [
    {
      icon: HiCollection,
      title: "PDF Birleştirme",
      desc: "Birden fazla PDF’i tek dosyada birleştir.",
      color: "from-emerald-500 to-teal-600",
      to: "/merge-pdf",
    },
    {
      icon: HiViewGrid,
      title: "PDF Parçalama",
      desc: "PDF’i sayfalara ayır ve hızlıca indir.",
      color: "from-sky-500 to-indigo-600",
      to: "/split-pdf",
    },
    {
      icon: HiArchive,
      title: "PDF Sıkıştırma",
      desc: "Kaliteden ödün vermeden dosya boyutunu küçült.",
      color: "from-lime-500 to-emerald-600",
      to: "/compress-pdf",
    },
    {
      icon: HiArrowsUpDown,
      title: "PDF Sıralama",
      desc: "PDF sayfalarını sürükle-bırak ile istediğin gibi sırala.",
      color: "from-purple-500 to-indigo-600",
      to: "/organize-pdf",
    },
    {
      icon: HiTrash,
      title: "PDF Sayfa Silme",
      desc: "Seçtiğin sayfaları kaldır, yeni PDF’ini indir.",
      color: "from-rose-500 to-red-600",
      to: "/remove-pages-pdf",
    },
    {
      icon: HiPhotograph,
      title: "Görsel → PDF",
      desc: "PNG/JPEG görsellerini PDF'e dönüştür.",
      color: "from-pink-500 to-rose-600",
      to: "/images-to-pdf",
    },
    {
      icon: HiRefresh,
      title: "PDF Döndürme",
      desc: "PDF sayfalarını istediğin açıyla kolayca döndür.",
      color: "from-amber-500 to-rose-500",
      to: "/rotate-pdf",
    },
    {
      icon: HiTable,
      title: "Excel → PDF",
      desc: "Excel (.xls, .xlsx) dosyalarını PDF'e dönüştür.",
      color: "from-green-500 to-emerald-600",
      soon: true,
    },
    {
      icon: HiRefresh,
      title: "Sayfa Döndür/Çıkar",
      desc: "Seçili sayfaları döndür veya kaldır.",
      color: "from-slate-500 to-zinc-600",
      soon: true,
    },
  ];

  const data = items?.length ? items : defaultItems;

  return (
    <section id="features" className="relative overflow-hidden bg-black">
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto animate-fadeInUp">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Öne Çıkan Araçlar
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Belgeleriniz için en popüler ve kullanışlı araçlar.
          </p>
        </div>

        {/* pointer grid yerine kart/linkte */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          {data.map((it, i) => (
            <Card key={it.title} item={it} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out both; }

        @keyframes cardFadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeInUp { animation: none !important; }
          .card-anim { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function Card({ item, index }) {
  const { icon: Icon, title, desc, color, to, soon } = item;

  const Wrapper = ({ children }) =>
    to ? (
      <Link
        to={to}
        aria-label={title}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 rounded-2xl cursor-pointer"
      >
        {children}
      </Link>
    ) : (
      <div className="h-full" role="group" aria-label={title}>
        {children}
      </div>
    );

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10
                 shadow-sm transition-all duration-300 transform-gpu 
                 hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-indigo-500/30 
                 focus-within:ring-indigo-500/40 isolation-isolate card-anim
                 bg-white/5 backdrop-blur-sm"
      style={{
        animation: `cardFadeInUp 0.5s ease ${index * 100 + 300}ms both`,
      }}
    >
      {/* hover parıltısı (kart içinde) */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/12 to-purple-500/12" />
      </div>

      <div className="relative z-10 p-5 md:p-6 h-full">
        {soon && (
          <span
            className="absolute right-3 top-3 text-[10px] uppercase tracking-wide
                       rounded-full bg-zinc-900/80 text-zinc-100
                       backdrop-blur-sm px-2 py-[1px]
                       shadow-sm ring-1 ring-white/20
                       transition-colors duration-200
                       group-hover:bg-indigo-500/90 group-hover:text-white"
          >
            Yakında
          </span>
        )}

        <Wrapper>
          <div className="flex items-start gap-4">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white flex-none`}
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <h3 className="text-base md:text-[17px] font-medium text-white">
                {title}
              </h3>
              <p className="mt-1 text-xs md:text-sm text-zinc-300 line-clamp-2">
                {desc}
              </p>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
