export default function HowItWorks() {
  const steps = [
    {
      k: 1,
      title: "İşlemi Seç",
      desc: "Birleştirme, parçalama araçlarından birini seç.",
    },
    {
      k: 2,
      title: "Dosyalarını Yükle",
      desc: "Dosyalarını sürükle-bırak veya cihazından yükle.",
    },
    {
      k: 3,
      title: "Tek Tuşla İndir",
      desc: "İşlem tamamlanınca çıktıyı tek tıkla indir.",
    },
  ];

  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="relative overflow-hidden border-zinc-200/10 bg-gradient-to-br from-black via-[#1a0b2e] to-purple-700 text-white"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2
              id="how-title"
              className="text-2xl md:text-3xl font-semibold tracking-tight"
            >
              Nasıl Çalışır ?
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/80">
              Sadece 3 adımda işlemini tamamla.
            </p>
          </div>

          <ol className="hidden md:flex items-center gap-4">
            {steps.map((s, i) => (
              <li key={s.k} className="flex items-center gap-3">
                <span
                  className="grid place-items-center h-9 w-9 rounded-xl 
                             bg-gradient-to-r from-indigo-500 to-purple-600 
                             text-white text-sm font-extrabold 
                             shadow-[0_4px_12px_rgba(99,102,241,0.6)]"
                >
                  {s.k}
                </span>
                <span className="text-sm font-medium">{s.title}</span>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="h-px w-10 bg-gradient-to-r from-white/50 to-transparent"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>

        <ol className="relative mt-10 grid gap-5 md:grid-cols-3">
          <span
            aria-hidden
            className="md:hidden absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-400 via-white/40 to-transparent"
          />

          {steps.map((s) => (
            <li
              key={s.k}
              className="group relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur 
                         p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)] 
                         transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]"
            >
              <div className="md:hidden absolute -left-[2px] top-6 h-4 w-4 rounded-full bg-white/20 border border-purple-400" />

              <div className="flex items-center gap-3">
                <span
                  className="grid place-items-center h-9 w-9 rounded-xl 
                             bg-gradient-to-r from-indigo-500 to-purple-600 
                             text-white text-sm font-extrabold 
                             shadow-[0_4px_12px_rgba(99,102,241,0.6)]"
                >
                  {s.k}
                </span>
                <h3 className="font-semibold">{s.title}</h3>
              </div>

              <p className="mt-2 text-sm leading-6 text-white/85">{s.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="h-px flex-1 bg-white/15" />
                <span className="ml-3 text-[11px] uppercase tracking-wide text-purple-300">
                  Hızlı & Kolay
                </span>
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  className="h-4 w-4 text-white/60"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17 17 7M9 7h8v8"
                  />
                </svg>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-xs text-white/70">
          * Daha fazla format, daha güçlü araçlar yolda...
        </p>
      </div>
    </section>
  );
}
