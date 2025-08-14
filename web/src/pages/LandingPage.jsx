import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import FeaturesGrid from "../components/sections/FeaturesGrid";
import UploadCTA from "../components/sections/UploadCTA";
import { HiArrowRight } from "react-icons/hi";
import { useState } from "react";

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
