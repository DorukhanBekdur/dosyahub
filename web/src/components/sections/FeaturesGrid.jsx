import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiCollection,
  HiViewGrid,
  HiPhotograph,
  HiArchive,
  HiRefresh,
  HiTable,
  HiTrash,
  HiDocumentText,
  HiOutlinePhotograph,
  HiScissors,
  HiPencilAlt,
} from "react-icons/hi";
import { HiArrowsUpDown } from "react-icons/hi2";

export default function FeaturesGrid({ items }) {
  const defaultItems = [
    // --- AKTİF ARAÇLAR ---
    {
      icon: HiDocumentText,
      title: "Word → PDF",
      desc: "Word dosyalarını hızlıca PDF'e dönüştür.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      to: "/word-to-pdf",
    },
    {
      icon: HiCollection,
      title: "PDF Birleştirme",
      desc: "Birden fazla PDF’i tek dosyada birleştir.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      to: "/merge-pdf",
    },
    {
      icon: HiViewGrid,
      title: "PDF Parçalama",
      desc: "PDF’i sayfalara ayır ve hızlıca indir.",
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      to: "/split-pdf",
    },
    {
      icon: HiArchive,
      title: "PDF Sıkıştırma",
      desc: "Kaliteden ödün vermeden boyutu küçült.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      to: "/compress-pdf",
    },
    {
      icon: HiArrowsUpDown,
      title: "PDF Sıralama",
      desc: "Sayfaları sürükle-bırak ile düzenle.",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      to: "/organize-pdf",
    },
    {
      icon: HiTrash,
      title: "Sayfa Silme",
      desc: "Gereksiz sayfaları PDF'ten temizle.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      to: "/remove-pages-pdf",
    },
    {
      icon: HiPhotograph,
      title: "Görsel → PDF",
      desc: "PNG/JPG görsellerini PDF'e aktar.",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      to: "/images-to-pdf",
    },
    {
      icon: HiOutlinePhotograph,
      title: "PDF → Görsel",
      desc: "PDF sayfalarını resim olarak kaydet.",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      to: "/pdf-to-images",
    },
    {
      icon: HiRefresh,
      title: "PDF Döndürme",
      desc: "Ters sayfaları kolayca düzelt.",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      to: "/rotate-pdf",
    },

    // --- YAKINDA GELECEK ARAÇLAR ---
    {
      icon: HiTable,
      title: "Excel → PDF",
      desc: "Excel tablolarını PDF'e dönüştür.",
      color: "text-green-500",
      bg: "bg-green-500/10",
      soon: true,
    },
    {
      icon: HiPencilAlt,
      title: "PDF Düzenle",
      desc: "PDF üzerine yazı veya çizim ekle.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      soon: true,
    },
    {
      icon: HiScissors,
      title: "PDF Böl",
      desc: "Belirli sayfa aralıklarını ayıkla.",
      color: "text-red-500",
      bg: "bg-red-500/10",
      soon: true,
    },
  ];

  const data = items?.length ? items : defaultItems;

  return (
    <section id="features" className="relative bg-[#0f0a1e] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            En Popüler PDF Araçları
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-zinc-400 text-lg"
          >
            İş akışınızı hızlandıracak profesyonel dosya çözümleri.
          </motion.p>
        </div>

        {/* Grid Yapısı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item, i) => (
            <Card key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item, index }) {
  const { icon: Icon, title, desc, color, bg, to, soon } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={soon ? "#" : to || "#"}
        className={`group relative flex flex-col h-full p-6 rounded-2xl border border-white/5 bg-white/[0.03] 
                   hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300
                   ${
                     soon
                       ? "cursor-default opacity-60 grayscale-[0.3]"
                       : "cursor-pointer"
                   }`}
      >
        {soon && (
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-md border border-indigo-400/20 shadow-sm">
            Yakında
          </span>
        )}

        <div className="flex items-start gap-4">
          <div
            className={`flex-none w-12 h-12 rounded-xl ${bg} flex items-center justify-center transition-transform duration-300 ${
              !soon && "group-hover:scale-110"
            }`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>

          <div className="flex-grow">
            <h3
              className={`text-[16px] font-semibold text-white transition-colors ${
                !soon && "group-hover:text-indigo-400"
              }`}
            >
              {title}
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed line-clamp-2">
              {desc}
            </p>
          </div>
        </div>

        {!soon && (
          <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/40 transition-all duration-500" />
        )}
      </Link>
    </motion.div>
  );
}
