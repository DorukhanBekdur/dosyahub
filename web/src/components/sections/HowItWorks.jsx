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
      className="relative isolate -mt-px overflow-hidden text-white
                 bg-gradient-to-b from-black via-[#110827] to-[#6d28d9]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]
                   bg-[radial-gradient(80rem_80rem_at_15%_-10%,theme(colors.indigo.400/35),transparent_60%),radial-gradient(70rem_70rem_at_110%_90%,theme(colors.purple.400/30),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2
              id="how-title"
              className="text-2xl md:text-3xl font-semibold tracking-tight"
            >
              Nasıl{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Çalışır?
              </span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/80">
              Sadece 3 adımda işlemini tamamla.
            </p>
          </div>

          <ol className="hidden md:flex items-center gap-4">
            {steps.map((s, i) => (
              <li key={s.k} className="flex items-center gap-3">
                <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-extrabold shadow-[0_4px_12px_rgba(99,102,241,0.55)]">
                  {s.k}
                </span>
                <span className="text-sm font-medium text-white/90">
                  {s.title}
                </span>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-gradient-to-r from-white/40 to-transparent"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Kart listesi */}
        <ol className="relative mt-10 grid gap-5 md:grid-cols-3">
          <span
            aria-hidden="true"
            className="md:hidden absolute left-[18px] top-0 bottom-0 w-px
                       bg-gradient-to-b from-purple-400 via-white/40 to-transparent"
          />
          {steps.map((s) => (
            <li
              key={s.k}
              className="group relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur
                         p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                         transition-all duration-300 hover:-translate-y-0.5
                         hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]
                         focus-within:ring-2 focus-within:ring-white/30"
            >
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-extrabold shadow-[0_4px_12px_rgba(99,102,241,0.55)]">
                  {s.k}
                </span>
                <h3 className="font-semibold text-white/95">{s.title}</h3>
              </div>

              <p className="mt-2 text-sm leading-6 text-white/85">{s.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="h-px flex-1 bg-gradient-to-r from-indigo-400/40 to-purple-400/40" />
                <span className="ml-3 text-[11px] uppercase tracking-wide text-purple-300">
                  Hızlı &amp; Kolay
                </span>
              </div>

              <span
                aria-hidden="true"
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
          * Daha fazla format, daha güçlü araçlar için çalışıyoruz.
        </p>
      </div>
    </section>
  );
}
