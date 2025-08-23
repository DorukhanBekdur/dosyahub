import {
  HiCollection,
  HiViewGrid,
  HiPhotograph,
  HiSwitchHorizontal,
  HiDocumentText,
  HiLightningBolt,
  HiRefresh,
  HiTable,
} from "react-icons/hi";

export default function FeaturesGrid({ items }) {
  const defaultItems = [
    {
      icon: HiCollection,
      title: "PDF Birleştirme",
      desc: "PDF'leri istediğin sırayla kolayca birleştir.",
      color: "from-emerald-500 to-teal-600",
      to: "/merge-pdf",
    },
    {
      icon: HiViewGrid,
      title: "PDF Parçalama",
      desc: "PDF’i sayfalara böl ve kolayca indir.",
      color: "from-sky-500 to-indigo-600",
      to: "/split-pdf",
    },
    {
      icon: HiLightningBolt,
      title: "PDF Sıkıştırma",
      desc: "Kaliteyi koruyarak boyutu küçült.",
      color: "from-lime-500 to-emerald-600",
    },
    {
      icon: HiDocumentText,
      title: "Word → PDF",
      desc: ".doc/.docx dosyalarını PDF’e dönüştür.",
      color: "from-amber-500 to-orange-600",
      soon: true,
    },
    {
      icon: HiTable,
      title: "Excel → PDF",
      desc: "Excel (.xls, .xlsx) dosyalarını PDF'e dönüştür.",
      color: "from-green-500 to-emerald-600",
      soon: true,
    },
    {
      icon: HiSwitchHorizontal,
      title: "Toplu Dönüştürme",
      desc: "Birden çok dosyayı tek seferde işle.",
      color: "from-purple-500 to-indigo-600",
      soon: true,
    },
    {
      icon: HiPhotograph,
      title: "Görsel → PDF",
      desc: "PNG/JPEG görsellerini PDF'e dönüştür.",
      color: "from-pink-500 to-rose-600",
      soon: true,
    },
    {
      icon: HiSwitchHorizontal,
      title: "PDF → Görsel",
      desc: "PDF’ini PNG/JPEG görsellere çevir.",
      color: "from-violet-500 to-fuchsia-600",
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
    <section
      id="features"
      className="relative border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.07]
        bg-[radial-gradient(60rem_60rem_at_20%_-10%,theme(colors.indigo.400/40),transparent_60%),radial-gradient(50rem_50rem_at_110%_10%,theme(colors.purple.400/35),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto animate-fadeInUp">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Öne Çıkan Araçlar
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Belgeleriniz için en popüler ve kullanışlı araçlar.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr cursor-pointer">
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
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
        @keyframes cardFadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function Card({ item, index }) {
  const { icon: Icon, title, desc, color, to, soon } = item;

  const Wrapper = ({ children }) =>
    to ? (
      <a
        href={to}
        aria-label={title}
        className="block h-full focus:outline-none"
      >
        {children}
      </a>
    ) : (
      <div className="h-full" role="group" aria-label={title}>
        {children}
      </div>
    );

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/60
                 dark:border-zinc-800/60 shadow-sm transition-all duration-300 transform-gpu 
                 hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-indigo-500/30 
                 focus-within:ring-indigo-500/40 isolation-isolate"
      style={{
        animation: `cardFadeInUp 0.5s ease ${index * 100 + 300}ms both`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#1a0b2e]/85 to-purple-700/80 opacity-35" />

      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/18 to-purple-500/18" />
      </div>

      <div className="relative z-10 p-5 md:p-6 h-full bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm rounded-2xl">
        {soon && (
          <span
            className="absolute right-3 top-3 text-[10px] uppercase tracking-wide
                       rounded-full bg-zinc-900/80 text-zinc-100
                       dark:bg-zinc-100/90 dark:text-zinc-900
                       backdrop-blur-sm px-2 py-[1px]
                       shadow-sm ring-1 ring-white/20 dark:ring-black/20
                       transition-colors duration-200
                       group-hover:bg-indigo-500/90 group-hover:text-white"
          >
            Yakında
          </span>
        )}

        <Wrapper>
          <div className="flex items-start gap-4">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl 
                          bg-gradient-to-br ${color} text-white flex-none`}
            >
              <Icon className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <h3 className="text-base md:text-[17px] font-medium text-zinc-100">
                {title}
              </h3>
              <p className="mt-1 text-xs md:text-sm text-zinc-400 line-clamp-2">
                {desc}
              </p>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
