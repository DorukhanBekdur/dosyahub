import { HiCursorClick, HiCloudUpload, HiDownload } from "react-icons/hi";

export default function HowItWorks() {
  const steps = [
    {
      k: 1,
      title: "İşlemi Seç",
      desc: "İhtiyacın olan PDF aracını listeden belirle ve tıkla.",
      icon: HiCursorClick,
      color: "from-blue-500 to-indigo-600",
    },
    {
      k: 2,
      title: "Dosyalarını Yükle",
      desc: "Dosyalarını sürükle-bırak yaparak veya seçerek yükle.",
      icon: HiCloudUpload,
      color: "from-purple-500 to-pink-600",
    },
    {
      k: 3,
      title: "Tek Tuşla İndir",
      desc: "İşlemin saniyeler içinde tamamlansın ve dosyanı indir.",
      icon: HiDownload,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <section id="how" className="relative bg-[#0f0a1e] py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Nasıl{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Çalışır?
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Belgelerini yönetmek sadece 3 basit adımdan ibaret.
          </p>
        </div>

        {/* ADIMLAR */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="hidden md:block absolute top-[40px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {steps.map((s) => (
            <div key={s.k} className="relative z-10 flex flex-col items-center">
              <div className="group flex flex-col items-center text-center cursor-default">
                <div className="relative mb-8">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} p-[1px] shadow-2xl transition-all duration-300 group-hover:shadow-indigo-500/20 group-hover:-translate-y-1`}
                  >
                    <div className="w-full h-full bg-[#0f0a1e] rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <span className="absolute -bottom-2 -right-1 text-white/5 text-5xl font-black italic select-none">
                        {s.k}
                      </span>
                      <s.icon className="w-8 h-8 text-white relative z-10" />
                    </div>
                  </div>

                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-[#0f0a1e] font-bold text-sm flex items-center justify-center shadow-lg border-4 border-[#0f0a1e] z-20">
                    {s.k}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed max-w-[280px]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="inline-block px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs text-zinc-500">
            * Dosyalarınız işlemden 15 dakika sonra sunucularımızdan kalıcı
            olarak silinir.
          </p>
        </div>
      </div>
    </section>
  );
}
