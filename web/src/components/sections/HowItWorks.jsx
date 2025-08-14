export default function HowItWorks() {
  const steps = [
    {
      title: "Dosyanı Yükle",
      desc: "PDF (ve yakında daha fazlası) dosyanı sürükleyip bırak.",
    },
    {
      title: "Ayarları Seç",
      desc: "Birleştirme, dönüştürme veya ayırma işlemini belirle.",
    },
    { title: "İndir", desc: "İşlem tamamlanınca tek tıkla indir." },
  ];

  return (
    <section
      id="how"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Nasıl Çalışır?
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/80 dark:bg-zinc-900/80"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold">
                {i + 1}
              </span>
              <h3 className="mt-4 font-medium">{s.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
