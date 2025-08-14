import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturesGrid from "../components/sections/FeaturesGrid";
import { HiCloudUpload, HiArrowRight } from "react-icons/hi";
import { useState } from "react";

function UploadCTA() {
  const [pending, setPending] = useState(false);
  return (
    <section
      id="upload"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Hemen Deneyin
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Sürükle-bırak ile PDF'lerinizi birleştirin. Çok yakında daha fazla
              format desteği!
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setPending(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-white font-medium shadow hover:opacity-95"
              >
                Dosya Yükle <HiCloudUpload className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                Örnek Dosya
              </button>
            </div>
            {pending && (
              <p className="mt-3 text-xs text-zinc-500">
                (Demo için: Yükleme simüle ediliyor…)
              </p>
            )}
          </div>

          <div className="w-full md:w-[420px] rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center">
            <HiCloudUpload className="mx-auto h-10 w-10 text-zinc-400" />
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              PDF'lerini buraya bırak ya da yükle.
            </p>
            <p className="text-xs text-zinc-500">
              Max 50MB • Sürükle & Bırak destekli
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    {
      q: "Dosyalarım nerede tutuluyor?",
      a: "Dosyalar yalnızca işlem sırasında geçici olarak depolanır ve kısa süre sonra silinir.",
    },
    {
      q: "Ücretli mi?",
      a: "Erken erişim sürecinde temel işlemler ücretsizdir. İleride gelişmiş özellikler için uygun fiyatlı planlar sunulabilir.",
    },
    {
      q: "Hangi dosya türleri desteklenecek?",
      a: "Şu an odak PDF; sırada PNG/JPG/WEBP ve ses-dönüşüm (MP4→MP3) var.",
    },
  ];
  return (
    <section
      id="faq"
      className="border-t border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Sıkça Sorulan Sorular
        </h2>
        <ul className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {items.map((it, idx) => (
            <li key={idx}>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <span className="font-medium">{it.q}</span>
                <HiArrowRight
                  className={`h-4 w-4 transition-transform ${
                    open === idx ? "rotate-90" : "rotate-0"
                  }`}
                />
              </button>
              {open === idx && (
                <div className="px-5 pb-5 mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {it.a}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto max-w-6xl px-4 h-14 text-xs text-zinc-500 flex items-center justify-between">
        <span>
          © {new Date().getFullYear()} DosyaHub — by{" "}
          <a
            href="https://github.com/DorukhanBekdur"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            Dorukhan Bekdur
          </a>
        </span>
        <span className="italic">Hızlı. Güvenli. Basit.</span>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <UploadCTA />
      <FAQ />
    </main>
  );
}
