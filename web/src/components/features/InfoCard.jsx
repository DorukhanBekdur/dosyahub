import {
  HiCheck,
  HiLockClosed,
  HiArrowTopRightOnSquare,
  HiMiniInformationCircle,
  HiPaintBrush,
} from "react-icons/hi2";

export default function InfoCard() {
  const features = [
    {
      title: "Hızlı ve Basit Kullanım",
      desc: "Karmaşık adımlar yok. Saniyeler içinde sonuç alın.",
      icon: <HiCheck className="h-5 w-5 text-emerald-400" />,
      bg: "bg-emerald-500/10",
    },
    {
      title: "Gelişmiş UI Tasarımı",
      desc: "Modern, sezgisel ve göz yormayan arayüz.",
      icon: <HiPaintBrush className="h-5 w-5 text-pink-400" />,
      bg: "bg-pink-500/10",
    },
    {
      title: "Gizlilik Öncelikli",
      desc: "Dosyalarınız işlem sonrası otomatik olarak silinir.",
      icon: <HiLockClosed className="h-5 w-5 text-sky-400" />,
      bg: "bg-sky-500/10",
    },
    {
      title: "Gelişen Altyapı",
      desc: "Yeni formatlar ve araçlar sürekli ekleniyor.",
      icon: <HiArrowTopRightOnSquare className="h-5 w-5 text-violet-400" />,
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <aside className="relative h-full min-h-[500px] flex flex-col bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 shadow-2xl transition-all duration-500 group overflow-hidden">
      {/* Dekoratif Gradient Işığı */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] bg-purple-500/10 pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-8">
          Neden{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            DosyaHub?
          </span>
        </h2>

        <ul className="space-y-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-4 group/item">
              <span
                className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${f.bg} border border-white/5 transition-transform duration-300 group-hover/item:scale-110`}
              >
                {f.icon}
              </span>
              <div>
                <p className="font-semibold text-zinc-100 group-hover/item:text-white transition-colors">
                  {f.title}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">
                  {f.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Hatırlatma Kutusu */}
        <div className="mt-10 rounded-3xl border border-white/5 bg-white/[0.02] p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
          <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider">
            <HiMiniInformationCircle className="text-indigo-400 w-5 h-5" />
            Önemli Hatırlatma
          </h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Büyük dosyalarda yükleme süresi internet hızınıza bağlıdır. İşlem
            takılırsa sayfayı yenilemeden bekleyin.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
        <span>Build: 1.0.2</span>
        <span className="text-indigo-500/50">Safe & Fast</span>
      </div>
    </aside>
  );
}
